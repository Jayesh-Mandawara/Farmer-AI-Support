import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const History = () => {
    const [queries, setQueries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/history")
            .then((res) => res.json())
            .then((data) => setQueries(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="container">
            <h2 className="page-title">Your Query History</h2>
            {queries.length === 0 ? (
                <p style={{ textAlign: "center" }}>No queries found.</p>
            ) : (
                <div className="history-list">
                    {queries.map((q) => (
                        <div
                            key={q._id}
                            className="history-item card"
                            onClick={() => navigate(`/chat/${q._id}`)}
                        >
                            <div className="history-info">
                                <h3>
                                    {q.crop} - {q.issueType}
                                </h3>
                                <p>{q.description.substring(0, 100)}...</p>
                            </div>
                            <div className="history-date">
                                {new Date(q.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
