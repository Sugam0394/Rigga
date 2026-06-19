 import { NavLink } from "react-router-dom";
 import "./BottomNavigation.css"

const BottomNavigation = () => {
  return (
    <nav className="bottom-nav">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive
            ? "active-tab"
            : ""
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/challenges/create"
        className={({ isActive }) =>
          isActive
            ? "active-tab"
            : ""
        }
      >
        Create
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive
            ? "active-tab"
            : ""
        }
      >
        Profile
      </NavLink>
    </nav>
  );
};

export default BottomNavigation;