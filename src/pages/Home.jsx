import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Weather from "../components/Weather";

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            style={{
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                padding: "15px 0",
                cursor: "pointer",
                transition: "all 0.3s ease",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: "600",
                    color: isOpen ? "var(--primary-color)" : "inherit",
                }}
            >
                <span>{question}</span>
                <span
                    style={{
                        fontSize: "1.2rem",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                        transition: "transform 0.3s",
                    }}
                >
                    +
                </span>
            </div>
            {isOpen && (
                <div
                    style={{
                        marginTop: "10px",
                        color: "#cbd5e1",
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                        paddingRight: "20px",
                        animation: "fadeIn 0.3s ease",
                    }}
                >
                    {answer}
                </div>
            )}
        </div>
    );
};

const Home = () => {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        fetch("/api/me")
            .then((res) => res.json())
            .then((data) => {
                if (data.name) setUserName(data.name);
                else if (data.email) setUserName(data.email.split("@")[0]);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = Object.fromEntries(new FormData(form));

        try {
            const res = await fetch("/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                alert("Message sent successfully!");
                form.reset();
            } else {
                alert("Failed to send message.");
            }
        } catch (err) {
            console.error(err);
            alert("Error sending message.");
        }
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = Object.fromEntries(new FormData(form));

        try {
            const res = await fetch("/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                alert("Thank you for your feedback!");
                form.reset();
            } else {
                alert("Failed to submit feedback.");
            }
        } catch (err) {
            console.error(err);
            alert("Error submitting feedback.");
        }
    };

    const faqData = [
        {
            question: "How does the AI Farmer Support work?",
            answer: "Our system uses advanced Artificial Intelligence to analyze your questions about crops, pests, or soil. It then matches your query with a vast database of agricultural knowledge to provide accurate, helpful advice.",
        },
        {
            question: "Is this service free to use?",
            answer: "Yes! The core features of asking queries, checking weather, and viewing your history are completely free for all farmers.",
        },
        {
            question: "How accurate is the advice provided?",
            answer: "The AI is trained on verified agricultural data. However, for critical issues like large-scale disease outbreaks, we always recommend consulting a local field expert as well.",
        },
        {
            question: "Can I receive weather alerts for my specific location?",
            answer: "Absolutely. The dashboard automatically detects your location (with your permission) and provides real-time weather updates and forecasts specific to your area.",
        },
        {
            question: "What kind of questions can I ask?",
            answer: "You can ask about crop diseases, pest control, fertilizer recommendations, soil health, irrigation schedules, and general farming best practices.",
        },
        {
            question: "Is my data private and secure?",
            answer: "Yes, your privacy is our priority. Your queries and personal information are stored securely and are never shared with third-party advertisers.",
        },
        {
            question: "Do I need high-speed internet to use this?",
            answer: "No, we have optimized the website to work well even on standard mobile data connections (3G/4G).",
        },
        {
            question: "How can I contact support if I have an issue?",
            answer: "You can use the 'Contact Us' form below to send us a message directly. We aim to respond within 24-48 hours.",
        },
    ];

    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="hero">
                <h1>Welcome Back, {userName || "Farmer"}!</h1>
                <p>Your one-stop solution for modern agriculture.</p>

                <div style={{ marginTop: "20px" }}>
                    <Link
                        to="/query-form"
                        className="btn btn-primary"
                        style={{ marginRight: "10px" }}
                    >
                        Ask a New Question
                    </Link>
                    <Link to="/history" className="btn btn-secondary">
                        View History
                    </Link>
                </div>
            </div>

            {/* Weather Dashboard */}
            <Weather />

            {/* About Us Section */}
            <section
                id="about"
                className="card"
                style={{ textAlign: "center" }}
            >
                <h2
                    className="section-title"
                    style={{
                        color: "var(--primary-dark)",
                        marginBottom: "15px",
                    }}
                >
                    About Us
                </h2>
                <p style={{ marginBottom: "20px" }}>
                    Technology-driven agricultural guidance built to support
                    farmers with clarity, speed, and responsibility.
                </p>
                <Link to="/about" className="btn btn-secondary">
                    Read More About Us
                </Link>
            </section>

            {/* Services */}
            <section
                id="services"
                className="features"
                style={{ marginBottom: "30px" }}
            >
                <div className="feature-card">
                    <div className="feature-icon">🔍</div>
                    <h3>Expert Diagnosis</h3>
                    <p>Identify crop diseases instantly.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🌦️</div>
                    <h3>Weather Alerts</h3>
                    <p>Real-time updates.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">📚</div>
                    <h3>Knowledge Base</h3>
                    <p>Learn from past data.</p>
                </div>
            </section>

            {/* FAQ Section - Expanded & Interactive */}
            <section id="faq" className="card">
                <h2
                    className="section-title"
                    style={{
                        color: "var(--primary-dark)",
                        marginBottom: "25px",
                        textAlign: "center",
                    }}
                >
                    Frequently Asked Questions
                </h2>
                <div className="faq-list">
                    {faqData.map((item, index) => (
                        <FAQItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                        />
                    ))}
                </div>
            </section>

            {/* Contact Section - AJAX */}
            <section id="contact" className="card">
                <h2
                    className="section-title"
                    style={{
                        color: "var(--primary-dark)",
                        marginBottom: "15px",
                    }}
                >
                    Contact Us
                </h2>
                <form onSubmit={handleContactSubmit}>
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        required
                    />
                    <textarea
                        name="message"
                        rows="2"
                        placeholder="Message"
                        required
                    ></textarea>
                    <button type="submit" className="btn btn-primary">
                        Send Message
                    </button>
                </form>
            </section>

            {/* Feedback Section - AJAX */}
            <section id="feedback" className="card">
                <h2
                    className="section-title"
                    style={{
                        color: "var(--primary-dark)",
                        marginBottom: "15px",
                    }}
                >
                    Feedback
                </h2>
                <p style={{ marginBottom: "15px" }}>
                    Your feedback helps us improve FarmerAI.
                </p>
                <form onSubmit={handleFeedbackSubmit}>
                    <select
                        name="rating"
                        required
                        style={{
                            width: "100%",
                            padding: "15px 20px",
                            borderRadius: "16px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            background: "rgba(0, 0, 0, 0.2)",
                            color: "white",
                            marginBottom: "20px",
                            fontFamily: "inherit",
                        }}
                    >
                        <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                        <option value="4">⭐⭐⭐⭐ Good</option>
                        <option value="3">⭐⭐⭐ Okay</option>
                        <option value="2">⭐⭐ Bad</option>
                        <option value="1">⭐ Poor</option>
                    </select>

                    <textarea
                        name="message"
                        rows="2"
                        placeholder="Your feedback"
                        required
                    ></textarea>
                    <button type="submit" className="btn btn-secondary">
                        Submit Feedback
                    </button>
                </form>
            </section>

            {/* Footer */}
            <footer
                style={{
                    marginTop: "40px",
                    padding: "20px",
                    borderTop: "1px solid #ccc",
                    textAlign: "center",
                }}
            >
                <p>© 2025 Farmer AI Support.</p>
                <div>
                    <Link to="/privacy" style={{ marginRight: "10px" }}>
                        Privacy Policy
                    </Link>
                    <Link to="/terms">Terms & Conditions</Link>
                </div>
            </footer>
        </div>
    );
};

export default Home;
