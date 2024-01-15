import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

function Topbar({ user }) {

  return (
    <div className="card w-100 p-3 ">
      <div className="d-flex  justify-content-between">
        <h3>User</h3>
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
