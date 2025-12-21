import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
    return (
        <div
            className="container"
            style={{ padding: "40px 20px", maxWidth: "800px" }}
        >
            <h1 className="page-title">Privacy Policy</h1>
            <div className="card">
                <p>
                    <strong>Last Updated: December 2025</strong>
                </p>

                <h3>1. Information We Collect</h3>
                <p>
                    We collect information you provide directly to us, such as
                    your name, email address, and farming queries when you use
                    our AI services.
                </p>

                <h3>2. How We Use Your Information</h3>
                <p>
                    We use your information to provide personalized farming
                    advice, improve our AI models (anonymously), and communicate
                    with you regarding your account.
                </p>

                <h3>3. Data Security</h3>
                <p>
                    We implement reasonable security measures to purely protect
                    your personal data. Your passwords are stored securely.
                </p>

                <h3>4. Cookies</h3>
                <p>
                    We use cookies to maintain your login session. You can
                    control cookie settings in your browser.
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

export default Privacy;
