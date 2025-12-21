import React from "react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div
            className="container"
            style={{ padding: "40px 20px", maxWidth: "1000px" }}
        >
            <header style={{ textAlign: "center", marginBottom: "40px" }}>
                <h1 className="page-title">
                    About Our Farmer Advisory Platform
                </h1>
                <p
                    className="subtitle"
                    style={{ fontSize: "1.2rem", color: "#cbd5e1" }}
                >
                    Technology-driven agricultural guidance built to support
                    farmers with clarity, speed, and responsibility.
                </p>
            </header>

            <main>
                <section className="card">
                    <h2
                        style={{
                            color: "var(--primary-color)",
                            marginBottom: "15px",
                        }}
                    >
                        Why This Platform Exists
                    </h2>
                    <p style={{ marginBottom: "10px" }}>
                        Farmers face real-world problems every day — crop
                        diseases, pest attacks, unpredictable weather, soil
                        degradation, and uncertainty in decision-making. Access
                        to timely and reliable guidance is often limited,
                        inconsistent, or delayed.
                    </p>
                    <p>
                        This platform was created to bridge that gap by
                        providing farmers with quick, understandable, and
                        structured advisory information using modern technology.
                    </p>
                </section>

                <section className="card">
                    <h2
                        style={{
                            color: "var(--primary-color)",
                            marginBottom: "15px",
                        }}
                    >
                        What Problem We Are Solving
                    </h2>
                    <p style={{ marginBottom: "10px" }}>
                        Many farmers rely on word-of-mouth advice, delayed
                        expert visits, or fragmented online information, which
                        can lead to incorrect decisions and financial loss.
                    </p>
                    <p>
                        Our system provides a single place where farmers can
                        clearly describe their problem and receive guidance
                        based on agricultural knowledge and established best
                        practices.
                    </p>
                </section>

                <section className="card">
                    <h2
                        style={{
                            color: "var(--primary-color)",
                            marginBottom: "15px",
                        }}
                    >
                        How Artificial Intelligence Helps
                    </h2>
                    <p style={{ marginBottom: "10px" }}>
                        The platform uses Artificial Intelligence (AI) to
                        analyze the farmer’s query written in simple language.
                        The AI processes this information and maps it against
                        agricultural knowledge to generate advisory responses.
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                        The AI does not guess randomly. It works on patterns,
                        agricultural data, and rule-based understanding to
                        provide structured suggestions such as:
                    </p>
                    <ul
                        style={{
                            listStyleType: "disc",
                            paddingLeft: "20px",
                            color: "#cbd5e1",
                        }}
                    >
                        <li style={{ marginBottom: "5px" }}>
                            Possible crop disease indicators (based on symptoms
                            described)
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Preventive pest management practices
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            General fertilizer and soil-care guidance
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Yield improvement and crop-care suggestions
                        </li>
                    </ul>
                </section>

                <section className="card">
                    <h2
                        style={{
                            color: "var(--primary-color)",
                            marginBottom: "15px",
                        }}
                    >
                        What We Are Providing
                    </h2>
                    <ul
                        style={{
                            listStyleType: "disc",
                            paddingLeft: "20px",
                            color: "#cbd5e1",
                        }}
                    >
                        <li style={{ marginBottom: "5px" }}>
                            AI-powered farmer query resolution
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Weather-based awareness for better planning
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Advisory insights on crops, soil, pests, and
                            irrigation
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            A simple and farmer-friendly interface
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Accessible guidance without complex technical steps
                        </li>
                    </ul>
                </section>

                <section className="card">
                    <h2
                        style={{
                            color: "var(--primary-color)",
                            marginBottom: "15px",
                        }}
                    >
                        What This Platform Is NOT
                    </h2>
                    <p style={{ marginBottom: "10px" }}>
                        Transparency matters. This platform is not a replacement
                        for certified agricultural experts, field officers, or
                        government advisory services.
                    </p>
                    <p>
                        The responses generated are guidance-based and
                        informational in nature. Farmers are always encouraged
                        to cross-check critical decisions with local
                        agricultural experts when necessary.
                    </p>
                </section>

                <section className="card">
                    <h2
                        style={{
                            color: "var(--primary-color)",
                            marginBottom: "15px",
                        }}
                    >
                        Why You Can Trust This Platform
                    </h2>
                    <ul
                        style={{
                            listStyleType: "disc",
                            paddingLeft: "20px",
                            color: "#cbd5e1",
                            marginBottom: "15px",
                        }}
                    >
                        <li style={{ marginBottom: "5px" }}>
                            No hidden charges or misleading recommendations
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            No promotion of specific products or brands
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Clear disclaimer about advisory limitations
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Designed with farmer usability in mind
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Focused on awareness, prevention, and informed
                            decision-making
                        </li>
                    </ul>
                    <p>
                        Our goal is not to replace human expertise, but to
                        support farmers with faster access to information that
                        helps them make better choices.
                    </p>
                </section>

                <section className="card">
                    <h2
                        style={{
                            color: "var(--primary-color)",
                            marginBottom: "15px",
                        }}
                    >
                        Benefits of Using This Platform
                    </h2>
                    <ul
                        style={{
                            listStyleType: "disc",
                            paddingLeft: "20px",
                            color: "#cbd5e1",
                        }}
                    >
                        <li style={{ marginBottom: "5px" }}>
                            Reduced dependency on delayed external help
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Better understanding of crop-related problems
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Improved decision-making through awareness
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Time-saving access to agricultural guidance
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            Support during early problem detection stages
                        </li>
                    </ul>
                </section>

                <section
                    className="card"
                    style={{
                        border: "1px solid #e74c3c",
                        background: "rgba(231, 76, 60, 0.1)",
                    }}
                >
                    <h2 style={{ color: "#e74c3c", marginBottom: "15px" }}>
                        Important Disclaimer
                    </h2>
                    <p>
                        This platform provides advisory suggestions based on
                        user input and general agricultural knowledge. Actual
                        field conditions may vary. Always consult certified
                        agricultural professionals for critical or large-scale
                        decisions.
                    </p>
                </section>

                <footer
                    style={{
                        textAlign: "center",
                        marginTop: "40px",
                        color: "#94a3b8",
                    }}
                >
                    <p>
                        Built with the intention to support and help the
                        farmers.
                    </p>
                    <div style={{ marginTop: "20px" }}>
                        <Link to="/home" className="btn btn-primary">
                            Back to Home
                        </Link>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default About;
