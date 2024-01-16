import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

function Topbar({ user, isSidebarOpen, setIsSidebarOpen }) {
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="border w-100 p-3 rounded-2">
      <div className="d-flex  justify-content-between">
        <Button onClick={toggleSidebar} className=" text-dark">
          {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </Button>
        <div className="d-flex align-items-center justify-content-end">
          <Link className="mx-4 text-black" to="/notifications">
            <NotificationsIcon />
            {user && user?.notifcation?.length > 0 && (
              <sup
                style={{
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "5px",
                }}
              >
                {user?.notifcation?.length}
              </sup>
            )}
          </Link>
          <Link className="text-black" to="/profile">
            <span>{user?.name}</span>
            <AccountCircleIcon style={{ marginLeft: "10px" }} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
