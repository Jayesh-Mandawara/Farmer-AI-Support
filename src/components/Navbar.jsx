import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

/**
 * Navbar Component
 *
 * Displays the application logo and navigation links.
 * handles logout by calling the backend /logout endpoint.
 */
const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Hide Navbar on Welcome (/) and Login (/login) pages
    if (
        ["/", "/login", "/auth/login", "/auth/signup"].includes(
            location.pathname
        )
    ) {
        return null;
    }

    const handleLogout = async () => {
        try {
            await fetch("/logout", { method: "POST" });
            navigate("/login");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <nav className="navbar">
            <Link
                to="/home"
                className="logo"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/6069/6069153.png"
                    alt="Logo"
                    style={{
                        height: "35px",
                        filter: "brightness(0) invert(1) drop-shadow(0 0 5px rgba(255,255,255,0.5))",
                    }}
                />
                <span>Farmer AI Support</span>
            </Link>
            <div className="nav-links">
                <Link to="/home">Home</Link>
                <Link to="/query-form">New Query</Link>
                <Link to="/history">History</Link>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
