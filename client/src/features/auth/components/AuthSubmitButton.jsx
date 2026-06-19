
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
  height: "56px",

  border: "none",

  borderRadius: "16px",

  backgroundColor: disabled
    ? "#E5E7EB"
    : "#F97316",

  color: "#FFFFFF",

  fontSize: "16px",

  fontWeight: "600",

  cursor: disabled
    ? "not-allowed"
    : "pointer",

  transition:
    "background-color 0.2s ease",
}}
    >
      {children}
    </button>
  );
};

export default AuthSubmitButton;