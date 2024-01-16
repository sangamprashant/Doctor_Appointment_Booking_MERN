import { Tabs } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";
import { deleteNotification, markNotificationAsRead } from "../../../ApiCalls";

function Notifications() {
  const { token, user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleMarkRead = async () => {
    try {
      const updatedUser = await markNotificationAsRead(token);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };
  const handleDeleteNotification = async () => {
    try {
      const updatedUser = await deleteNotification(token);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  return (
    <div>
      <h1>Notifications</h1>
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          {user?.notifcation?.length > 0 && (
            <>
              <div className="d-flex justify-content-end">
                <a className="anchor" onClick={handleMarkRead}>
                  Mark as read
                </a>
              </div>

              {user?.notifcation.map((data, index) => (
                <div
                  className="card p-2"
                  onClick={() => navigate(data.onClickPath)}
                  key={index}
                >
                  <div className="card-text">{data.message}</div>
                </div>
              ))}
            </>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Seen" key={1}>
          {user?.seennotification?.length > 0 && (
            <>
              <div className="d-flex justify-content-end">
                <a className="anchor" onClick={handleDeleteNotification}>
                  Delete Notification
                </a>
              </div>

              {user?.seennotification.map((data, index) => (
                <div
                  className="card p-2"
                  onClick={() => navigate(data.onClickPath)}
                  key={index}
                >
                  <div className="card-text">{data.message}</div>
                </div>
              ))}
            </>
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Notifications;
