 
 
 
 
 const AuthHeader = ({ title, subtitle }) => {
  return (
    <div
      style={{
        marginBottom: "32px",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          lineHeight: "1.2",
          marginBottom: "12px",
        }}
      >
        {title}
      </h1>

      <p
        style={{
          color: "#6B7280",
          lineHeight: "1.6",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
};

export default AuthHeader;