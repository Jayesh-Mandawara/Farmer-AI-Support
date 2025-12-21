import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import QueryForm from "./pages/QueryForm";
import Chat from "./pages/Chat";
import History from "./pages/History";
import Welcome from "./pages/Welcome";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import "./styles/global.css";
import "./styles/components.css";

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/query-form" element={<QueryForm />} />
                        <Route path="/chat/:id" element={<Chat />} />
                        <Route path="/history" element={<History />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
