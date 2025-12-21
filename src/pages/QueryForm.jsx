import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QueryForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Convert to JSON and send
        try {
            const response = await fetch("/query-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.redirected) {
                // Backend redirects to /chat/:id
                const url = new URL(response.url);
                const path = url.pathname; // Should be /chat/:id
                navigate(path);
            }
        } catch (err) {
            console.error(err);
            alert("Error submitting query");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="query-form-container card">
            <h2 className="page-title">Submit a New Query</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Your Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter your full name"
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Enter your phone number"
                    />
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        required
                        placeholder="Village, District, State"
                    />
                </div>

                <div className="form-group">
                    <label>Soil Type</label>
                    <select name="soilType" required>
                        <option value="">Select Soil Type</option>
                        <option value="Alluvial">Alluvial (Loamy)</option>
                        <option value="Black">Black (Clayey)</option>
                        <option value="Red">Red (Sandy/Loamy)</option>
                        <option value="Laterite">Laterite</option>
                        <option value="Desert">Desert (Sandy)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Crop Name</label>
                    <input
                        type="text"
                        name="crop"
                        required
                        placeholder="e.g. Rice, Wheat, Cotton"
                    />
                </div>

                <div className="form-group">
                    <label>Issue Type</label>
                    <select name="issueType" required>
                        <option value="">Select Issue Type</option>
                        <option value="Disease">Disease / Pest</option>
                        <option value="Growth">Growth Issues</option>
                        <option value="Water">Water / Irrigation</option>
                        <option value="Fertilizer">
                            Fertilizer / Nutrient
                        </option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Description of the problem</label>
                    <textarea
                        name="description"
                        rows="4"
                        required
                        placeholder="Describe the issue in detail..."
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Preferred Language</label>
                    <select name="language">
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Query"}
                </button>
            </form>
        </div>
    );
};

export default QueryForm;
