 import { Outlet } from "react-router-dom";

import BottomNavigation from "../components/BottomNavigation";
import NotificationBell from "../features/notifications/components/NotificationBell";

import "./AppLayout.css";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <header className="app-layout-header">
        <NotificationBell />
      </header>

      <main className="app-layout-main">
        <Outlet />
      </main>

      <BottomNavigation />
    </div>
  );
};

export default AppLayout;