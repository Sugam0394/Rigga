import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import "./Chat.css";

const Chat = () => {

  const navigate = useNavigate();

  /**
   * STATES
   */
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [historyLoading, setHistoryLoading] =
    useState(true);

  const [mode, setMode] =
    useState("normal");

  const bottomRef = useRef(null);

  /**
   * FETCH CHAT HISTORY
   */
  useEffect(() => {

    const fetchHistory = async () => {

      try {

        setHistoryLoading(true);

        const response =
          await api.get("/chat/history");

        const historyMessages =
          response.data.messages;

        if (historyMessages.length > 0) {

          setMessages(historyMessages);

        } else {

          setMessages([
            {
              role: "ai",
              text:
                "Kya haal hai? Task kar raha hai ya excuses bana raha hai? 😈",
            },
          ]);
        }

      } catch (error) {

        console.log(error);

        setMessages([
          {
            role: "ai",
            text:
              "Rigga history load nahi kar paaya 💀",
          },
        ]);

      } finally {

        setHistoryLoading(false);
      }
    };

    fetchHistory();

  }, []);

  /**
   * AUTO SCROLL
   */
  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);

  /**
   * SEND MESSAGE
   */
  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentInput = input;

    setInput("");

    setLoading(true);

    try {

      const response = await api.post(
        "/chat",
        {
          message: currentInput,
        }
      );

      const aiMessage = {
        role: "ai",
        text: response.data.reply,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      /**
       * UPDATE MODE
       */
      setMode(
        response.data.mode || "normal"
      );

    } catch (error) {

      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "Aaj Rigga ka dimag kharab hai 💀",
        },
      ]);

    } finally {

      setLoading(false);
    }
  };

  /**
   * ENTER KEY
   */
  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      sendMessage();
    }
  };

  /**
   * LOADING SCREEN
   */
  if (historyLoading) {

    return (
      <div className="chat-loading">

        <div className="chat-loader"></div>

        <p>
          Rigga purani chats yaad kar raha
          hai...
        </p>

      </div>
    );
  }

  return (
    <div className="chat-page">

      {/* HEADER */}
      <div className="chat-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="chat-title">

          <span>Rigga AI 🤖</span>

          <div
            className={`mode-badge ${mode}`}
          >

            {mode === "emergency" &&
              "🚨 EMERGENCY"}

            {mode === "brutal" &&
              "💀 BRUTAL"}

            {mode === "normal" &&
              "🔥 NORMAL"}

            {mode === "no_task" &&
              "😴 NO TASK"}

          </div>

        </div>

      </div>

      {/* MESSAGES */}
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

      {/* INPUT AREA */}
      <div className="chat-input-area">

        <input
          type="text"
          placeholder="Type karo..."
          value={input}
          disabled={loading}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>

      </div>

    </div>
  );
};

export default Chat;