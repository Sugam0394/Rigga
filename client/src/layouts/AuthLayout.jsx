 import {
  Outlet,
  Link,
} from "react-router-dom";

const AuthLayout = () => {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        padding: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <Outlet />

        <footer
          style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          <Link to="/legal/terms">
            Terms of Service
          </Link>

          {" • "}

          <Link to="/legal/privacy">
            Privacy Policy
          </Link>
        </footer>
      </div>
    </main>
  );
};

export default AuthLayout;