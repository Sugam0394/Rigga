 import { Outlet } from "react-router-dom";
 import AppHeader from "../components/AppHeader";
import BottomNavigation from "../components/BottomNavigation";
import "./AppLayout.css"


 const AppLayout = () => {
  return (
    <>
      <AppHeader />

      <main className="app-content">
        <Outlet />
      </main>

      <BottomNavigation />
    </>
  );
};

export default AppLayout;