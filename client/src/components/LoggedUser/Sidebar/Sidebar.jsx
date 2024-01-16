// Sidebar.jsx
import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import Groups2Icon from "@mui/icons-material/Groups2";
import Topbar from "../Topbar/Topbar";
import { AppContext } from "../../../AppContext";
import { toast } from "react-toastify";

const userMenu = [
  {
    label: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    label: "Appointments",
    path: "/appointments",
    icon: <CalendarTodayIcon />,
  },
  {
    label: "Apply Doctor",
    path: "/apply-doctor",
    icon: <AssignmentIndIcon />,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <PersonIcon />,
  },
];

const adminMenu = [
  {
    label: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: <Groups2Icon />,
  },
  {
    label: "Doctors",
    path: "/admin/doctors",
    icon: <AssignmentIndIcon />,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <PersonIcon />,
  },
];

function Sidebar({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { token, setToken, isLogged, setIsLogged, user } =
    useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const menuRender = user?.isAdmin ? adminMenu : userMenu;

  const handelLogout = () => {
  const confirmed = window.confirm("Are you sure you want to logout?");
  if (confirmed) {
    sessionStorage.clear();
    setIsLogged(false);
    setToken(null);
    toast.success("Logged out successfully");
    navigate("/");
  }
};

  return (
    <div className={`d-flex`}>
      <div
        className={`sidebar d-flex  flex-column gap-5 p-3 ${
          isSidebarOpen ? "sidebar-open" : "small"
        }`}
      >
        <div className="d-flex justify-content-start text-dark">
          LOGO
        </div>
        <div className="d-flex justify-content-center flex-column gap-5">
          {menuRender.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`sidenav-item shadow rounded-3 border-3 ${
                location.pathname === item.path ? "active" : "inactive"
              }`}
            >
              {item.icon}
              {isSidebarOpen && item.label}
            </Link>
          ))}
          <Link className={`sidenav-item shadow rounded-3 border-3 inactive`} onClick={handelLogout}>
            <ExitToAppIcon />
            {isSidebarOpen && "Logout"}
          </Link>
        </div>
      </div>
      <div className={`main-content p-3 w-100 ${isSidebarOpen ? "" : ""}`}>
        <Topbar user={user} isSidebarOpen={isSidebarOpen}  setIsSidebarOpen={setIsSidebarOpen}/>
        <div className="card p-3 mt-3 h-100">{children}</div>
      </div>
    </div>
  );
}

export default Sidebar;
