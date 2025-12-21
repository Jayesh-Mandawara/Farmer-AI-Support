import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);
    const hasFetchedInitial = useRef(false);

    // Scroll to bottom helper
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const loadingMsg = (text) => {
            setMessages((prev) => [...prev, { role: "model", text }]);
            setLoading(false);
        };

        const initChat = async () => {
            try {
                const res = await fetch(`/api/query/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    // Construct info message
                    const initialUserMsg = {
                        role: "user",
                        text: `Query: ${data.crop} - ${data.issueType}\n${data.description}`,
                    };

                    let loadedMessages = [initialUserMsg];

                    if (data.chatHistory && data.chatHistory.length > 0) {
                        loadedMessages = [
                            ...loadedMessages,
                            ...data.chatHistory,
                        ];
                    } else {
                        // No history, meaning new query. Trigger initial answer.
                        if (!hasFetchedInitial.current) {
                            hasFetchedInitial.current = true;
                            // Call answer API
                            const ansRes = await fetch(`/api/answer/${id}`, {
                                method: "POST",
                            });
                            const ansData = await ansRes.json();
                            loadingMsg(ansData.answer);
                            return;
                        }
                    }
                    setMessages(loadedMessages);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Error", err);
            }
        };

        initChat();
    }, [id]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userText = input;
        setInput("");
        setMessages((prev) => [...prev, { role: "user", text: userText }]);
        setLoading(true);

        try {
            const res = await fetch(`/api/followup/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userText }),
            });
            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { role: "model", text: data.reply },
            ]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Helper to format text without external libraries
    const formatMessage = (text) => {
        if (!text) return null;

        // Split by double newlines for paragraphs
        const paragraphs = text.split(/\n\n+/);

        return paragraphs.map((para, i) => {
            // Check for bullets
            if (para.trim().startsWith("*") || para.trim().startsWith("-")) {
                const items = para
                    .split(/\n/)
                    .map((item) => item.replace(/^[*-]\s+/, ""));
                return (
                    <ul
                        key={i}
                        style={{ margin: "10px 0", paddingLeft: "20px" }}
                    >
                        {items.map((item, j) => (
                            <li
                                key={j}
                                dangerouslySetInnerHTML={{
                                    __html: item.replace(
                                        /\*\*(.*?)\*\*/g,
                                        "<strong>$1</strong>"
                                    ),
                                }}
                            ></li>
                        ))}
                    </ul>
                );
            }

            // Normal paragraph with bold parsing
            return (
                <p
                    key={i}
                    style={{ marginBottom: "10px", whiteSpace: "pre-wrap" }}
                    dangerouslySetInnerHTML={{
                        __html: para.replace(
                            /\*\*(.*?)\*\*/g,
                            "<strong>$1</strong>"
                        ),
                    }}
                />
            );
        });
    };

    return (
        <div className="container" style={{ marginTop: "20px" }}>
            <h2 className="page-title">Farmer Assistant Chat</h2>
            <div className="chat-container">
                <div className="chat-history">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`message ${
                                msg.role === "user" ? "user" : "model"
                            }`}
                        >
                            {/* Use custom formatter instead of ReactMarkdown */}
                            {formatMessage(msg.text)}
                        </div>
                    ))}
                    {loading && (
                        <div className="message model">Thinking...</div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="chat-input-area">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Ask a follow-up question..."
                    />
                    <button className="btn btn-primary" onClick={handleSend}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
