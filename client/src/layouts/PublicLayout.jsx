 import { Outlet } from "react-router-dom";
import "./PublicLayout.css";

const PublicLayout = () => {
  return (
    <main className="public-layout">
      <Outlet />
    </main>
  );
};

export default PublicLayout;