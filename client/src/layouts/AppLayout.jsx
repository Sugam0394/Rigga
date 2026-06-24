 import { Outlet } from "react-router-dom";
 
import BottomNavigation from "../components/BottomNavigation";

import NotificationBell from "../features/notifications/components/NotificationBell";

const AppLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F9FAFB",
        paddingBottom: "90px",
      }}
    >
    <header
  style={{
    display: "flex",
    justifyContent: "flex-end",
    padding: "16px",
  }}
>
  <NotificationBell />
</header>

      <main>
        <Outlet />
      </main>

      <BottomNavigation />
    </div>
  );
};

export default AppLayout;