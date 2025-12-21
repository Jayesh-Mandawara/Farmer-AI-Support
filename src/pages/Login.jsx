import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Choose endpoint
        const endpoint = isLogin ? "/auth/login" : "/auth/signup";

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const resData = await response.json();

            if (response.ok && resData.success) {
                // Success
                window.location.href = "/home"; // Force reload to refresh navbar/cookies state
            } else {
                // Error
                setError(resData.error || "Authentication failed");
            }
        } catch (err) {
            console.error(err);
            setError("Network error occurred");
        }
    };

    return (
        <div className="auth-container card">
            <h2 className="page-title">{isLogin ? "Login" : "Sign Up"}</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                )}

                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                >
                    {isLogin ? "Login" : "create Account"}
                </button>
            </form>

            <p style={{ marginTop: "15px" }}>
                {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                <span
                    style={{
                        color: "var(--primary-color)",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setError("");
                    }}
                >
                    {isLogin ? "Sign Up" : "Login"}
                </span>
            </p>
        </div>
    );
};

export default Login;
