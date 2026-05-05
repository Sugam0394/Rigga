 import { useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/api";

const InputBar = ({ setMessages }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input || loading) return;

    const userMsg = { text: input, type: "user" };

    // add user msg
    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);

    try {
      const res = await axios.post(`${API}/webhook`, {
        Body: input,
        From: "whatsapp:+911234567890",
      });

      // backend se JSON aana chahiye
      const aiMsg = {
        text: res.data.message || "No response",
        type: "ai",
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("API ERROR:", err.message);

      setMessages((prev) => [
        ...prev,
        { text: "Server error", type: "ai" },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type..."
      />

      <button onClick={sendMessage}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default InputBar;