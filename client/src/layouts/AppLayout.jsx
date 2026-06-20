 import { Outlet } from "react-router-dom";
 
import BottomNavigation from "../components/BottomNavigation";

const AppLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F9FAFB",
        paddingBottom: "90px",
      }}
    >
    

      <main>
        <Outlet />
      </main>

      <BottomNavigation />
    </div>
  );
};

export default AppLayout;