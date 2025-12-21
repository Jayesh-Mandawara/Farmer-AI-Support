import React from "react";
import { Link } from "react-router-dom";

const Terms = () => {
    return (
        <div
            className="container"
            style={{ padding: "40px 20px", maxWidth: "800px" }}
        >
            <h1 className="page-title">Terms and Conditions</h1>
            <div className="card">
                <p>
                    <strong>Last Updated: December 2025</strong>
                </p>

                <h3>1. Acceptance of Terms</h3>
                <p>
                    By accessing and using the Farmer AI Support System, you
                    accept and agree to be bound by the terms and provision of
                    this agreement.
                </p>

                <h3>2. Nature of Advice</h3>
                <p>
                    The advice provided by this AI system is for informational
                    purposes only. While we strive for accuracy, agricultural
                    decisions should always be verified with local field
                    experts.
                </p>

                <h3>3. User Responsibilities</h3>
                <p>
                    You agree to provide accurate information about your crops
                    and conditions to receive the best possible advice.
                </p>

                <div style={{ marginTop: "20px" }}>
                    <Link to="/home" className="btn btn-primary">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Terms;
