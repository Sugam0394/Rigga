import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
import "./Chat.css";
import { useNavigate } from 'react-router-dom'

const Chat = () => {

  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Kya haal hai? Task kar raha hai ya excuses bana raha hai? 😈",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;

    setInput("");
    setLoading(true);

    try {

      const response = await api.post("/chat", {
        message: currentInput,
      });

      const aiMessage = {
        role: "ai",
        text: response.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Aaj Rigga ka dimag kharab hai 💀",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-page">

      <div className="chat-header">
        <button onClick={() => navigate(-1)}>
          ← Back
        </button>
        <span>Rigga AI 🤖</span>
      </div>

      <div className="chat-messages">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-row ${
              msg.role === "user"
                ? "user-row"
                : "ai-row"
            }`}
          >
            <div
              className={`message-bubble ${
                msg.role === "user"
                  ? "user-bubble"
                  : "ai-bubble"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-row ai-row">
            <div className="message-bubble ai-bubble">
              ...
            </div>
          </div>
        )}

        <div ref={bottomRef}></div>

      </div>

      <div className="chat-input-area">

        <input
          type="text"
          placeholder="Type karo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>
    </div>
  );
};

export default Chat;