import {
  Outlet,
  Link,
} from "react-router-dom";

import "./AuthLayout.css";

const AuthLayout = () => {
  return (
    <main className="auth-layout">
      <div className="auth-layout-container">
        <Outlet />

        <footer className="auth-layout-footer">
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