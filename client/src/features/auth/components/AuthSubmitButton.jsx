
 const AuthSubmitButton = ({
  children,
  disabled = false,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        width: "100%",
        height: "48px",
        border: "none",
        borderRadius: "12px",
        backgroundColor: disabled
          ? "#C7D2FE"
          : "#4F46E5",
        color: "#FFFFFF",
        fontSize: "16px",
        fontWeight: "600",
        cursor: disabled
          ? "not-allowed"
          : "pointer",
      }}
    >
      {children}
    </button>
  );
};

export default AuthSubmitButton;