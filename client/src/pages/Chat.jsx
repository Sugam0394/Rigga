import { useState } from "react";
import MessageBubble from "../components/MessageBubble";
import InputBar from "../components/InputBar";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <MessageBubble key={index} msg={msg} />
        ))}
      </div>

      <InputBar setMessages={setMessages} />
    </div>
  );
};

export default Chat;