 import { Outlet } from "react-router-dom";
import AuthBrand from "../components/AuthBrand";

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
        <AuthBrand />

        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;