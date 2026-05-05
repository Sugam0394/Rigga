const MessageBubble = ({ msg }) => {
  return (
    <div className={msg.type === "user" ? "user-msg" : "ai-msg"}>
      {msg.text}
    </div>
  );
};

export default MessageBubble;