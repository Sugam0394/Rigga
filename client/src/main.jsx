 import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
   <GoogleOAuthProvider
  clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
>
  <AuthProvider>
    <App />
  </AuthProvider>
</GoogleOAuthProvider>
  </React.StrictMode>
);
