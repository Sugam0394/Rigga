 import { useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/api";

const InputBar = ({ setMessages }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;

    // 👇 1. Show user message instantly
    setMessages((prev) => [
      ...prev,
      { text: userText, type: "user" },
    ]);

    setInput("");
    setLoading(true);

    try {
      // 👇 2. Call correct backend route (/chat)
      const res = await axios.post(`${API}/chat`, {
        Body: userText,
        From: "web-user",
      });

      // 👇 3. Add AI response
      setMessages((prev) => [
        ...prev,
        {
          text: res.data.message || "No response",
          type: "ai",
        },
      ]);
    } catch (err) {
      console.error("API ERROR:", err);

      setMessages((prev) => [
        ...prev,
        {
          text: "Server error. Check backend.",
          type: "ai",
        },
      ]);
    }

    setLoading(false);
  };

  // 👇 Enter key support
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div style={{ display: "flex", padding: "10px", gap: "10px" }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type message..."
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        style={{
          padding: "10px 15px",
          borderRadius: "8px",
          background: "#f97316",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
};

export default InputBar;