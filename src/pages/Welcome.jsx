import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div
            className="welcome-container"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
                textAlign: "center",
                padding: "20px",
            }}
        >
            <h1
                style={{
                    fontSize: "3rem",
                    color: "var(--primary-dark)",
                    marginBottom: "20px",
                }}
            >
                Welcome to Farmer AI Support
            </h1>
            <p
                style={{
                    fontSize: "1.2rem",
                    maxWidth: "600px",
                    marginBottom: "40px",
                    color: "#555",
                }}
            >
                Empowering farmers with intelligent solutions for crop
                management, disease control, and maximized yields.
            </p>

            <img
                src="https://img.freepik.com/free-vector/organic-farming-concept_23-2148426861.jpg"
                alt="Farming Illustration"
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "15px",
                    marginBottom: "40px",
                }}
                onError={(e) => (e.target.style.display = "none")} // Hide if not loads
            />

            <Link
                to="/login"
                className="btn btn-primary"
                style={{ fontSize: "1.2rem", padding: "15px 40px" }}
            >
                Get Started
            </Link>
        </div>
    );
};

export default Welcome;
