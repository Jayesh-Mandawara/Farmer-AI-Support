const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/farmerAI";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/* ---------------- This is the connection of DB ---------------- */
mongoose
    .connect(MONGO_URL)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.log(err));

/* ---------------- Here are all the MODELS and SCHEMAS ---------------- */
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});
const User = mongoose.model("User", userSchema);

const querySchema = new mongoose.Schema(
    {
        userEmail: String,
        name: String,
        phone: String,
        location: String,
        soilType: String,
        crop: String,
        issueType: String,
        description: String,
        language: String,
        chatHistory: Array,
        rating: String,
    },
    { timestamps: true }
);

querySchema.index({ userEmail: 1 });
const FarmingQuery = mongoose.model("FarmingQuery", querySchema);

const contactSchema = new mongoose.Schema(
    {
        userEmail: String,
        subject: String,
        message: String,
    },
    { timestamps: true }
);

const feedbackSchema = new mongoose.Schema(
    {
        userEmail: String,
        rating: Number,
        message: String,
    },
    { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
const Feedback = mongoose.model("Feedback", feedbackSchema);

/* ---------------- Here are all the MIDDLEWARES ---------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Serve React Build
app.use(express.static(path.join(__dirname, "../dist")));

/* ---------------- This is the AUTH MIDDLEWARE ---------------- */
function requireLogin(req, res, next) {
    if (!req.cookies.userEmail)
        return res.status(401).json({ error: "Unauthorized" });
    next();
}

/* ---------------- LOGIN/SIGNUP API ---------------- */

// Login Route
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res
            .status(401)
            .json({ error: "User not found. Please Sign Up." });
    }

    if (user.password !== password) {
        return res.status(401).json({ error: "Incorrect password." });
    }

    res.cookie("userEmail", email);
    res.json({ success: true });
});

// Signup Route
app.post("/auth/signup", async (req, res) => {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
        return res
            .status(400)
            .json({ error: "Email already exists. Please Login." });
    }

    await User.create({ name, email, password });
    res.cookie("userEmail", email);
    res.json({ success: true });
});

/* ---------------- API ROUTES ---------------- */

// Get User Info
app.get("/api/me", async (req, res) => {
    if (!req.cookies.userEmail) return res.json({ name: null, email: null });
    const user = await User.findOne({ email: req.cookies.userEmail });
    res.json({
        email: req.cookies.userEmail,
        name: user ? user.name : null,
    });
});

// Get Query History
app.get("/api/history", async (req, res) => {
    const email = req.cookies.userEmail;
    if (!email) return res.status(401).json([]);

    const data = await FarmingQuery.find({ userEmail: email }).sort({
        createdAt: -1,
    });

    res.json(data);
});

// Get Single Query by ID (Required for Chat Page)
app.get("/api/query/:id", requireLogin, async (req, res) => {
    try {
        const query = await FarmingQuery.findById(req.params.id);
        if (!query) return res.status(404).json({ error: "Not found" });
        // Ensure user owns this query
        if (query.userEmail !== req.cookies.userEmail) {
            return res.status(403).json({ error: "Forbidden" });
        }
        res.json(query);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/logout", (_, res) => {
    res.clearCookie("userEmail");
    res.end();
});

/* ---------------- QUERY FORM SUBMISSION ---------------- */
app.post("/query-form", async (req, res) => {
    const email = req.cookies.userEmail;
    if (!email) return res.redirect("/login");

    const saved = await FarmingQuery.create({
        ...req.body,
        userEmail: email,
    });

    res.redirect(`/chat/${saved._id}`);
});

/* ---------------- GEMINI AI INTEGRATION ---------------- */
async function callGemini(system, user) {
    const url =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        GEMINI_API_KEY;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: system + "\n\n" + user }],
                    },
                ],
            }),
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error("Gemini API Error:", response.status, errText);
            return "Error from AI Service";
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            console.log(
                "Unexpected Gemini Response Structure:",
                JSON.stringify(data, null, 2)
            );
            return "No response content found.";
        }
        return text;
    } catch (error) {
        console.error("Gemini Fetch Error:", error);
        return "Failed to connect to AI.";
    }
}

// Generate Initial Answer
app.post("/api/answer/:id", async (req, res) => {
    const q = await FarmingQuery.findById(req.params.id);
    if (!q) return res.status(404).json({ error: "Not found" });

    const prompt = `
Farmer: ${q.name}
Crop: ${q.crop}
Issue: ${q.issueType}
Description: ${q.description}
`;

    const answer = await callGemini("You are Raghu. Reply simple.", prompt);

    // Save the answer to chat history so it persists
    await FarmingQuery.findByIdAndUpdate(req.params.id, {
        $push: { chatHistory: { role: "model", text: answer } },
    });

    res.json({ answer });
});

// Follow-up Chat
app.post("/api/followup/:id", async (req, res) => {
    const q = await FarmingQuery.findById(req.params.id);

    // Construct history for context (optional, but good for better answers)
    // For simplicity, just sending the new message as context is limited but follows existing pattern.

    const reply = await callGemini("Continue conversation.", req.body.message);

    await FarmingQuery.findByIdAndUpdate(req.params.id, {
        $push: {
            chatHistory: {
                $each: [
                    { role: "user", text: req.body.message },
                    { role: "model", text: reply },
                ],
            },
        },
    });

    res.json({ reply });
});

/* ---------------- CONTACT & FEEDBACK ENDPOINTS ---------------- */
app.post("/contact", async (req, res) => {
    const email = req.cookies.userEmail;
    if (!email) return res.status(401).json({ error: "Unauthorized" });

    await Contact.create({
        userEmail: email,
        subject: req.body.subject,
        message: req.body.message,
    });

    res.json({ success: true });
});

app.post("/feedback", async (req, res) => {
    const email = req.cookies.userEmail;
    if (!email) return res.status(401).json({ error: "Unauthorized" });

    await Feedback.create({
        userEmail: email,
        rating: Number(req.body.rating),
        message: req.body.message,
    });

    res.json({ success: true });
});

/* ---------------- CATCH-ALL ROUTE FOR REACT SPA ---------------- */
app.get(/.*/, (_, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
