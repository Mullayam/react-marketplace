import React from "react";
import { Avatar, Badge } from "antd";
import NotificationPopup from "./NotificationPopup";
import {
  GetAllNotifications,
  ReadAllNotifications,
} from "../services/notifications";

export default function NotificationBadge() {
  const [notifications, setNotifications] = React.useState(null);
  const [showNotifications, setShowNotifications] = React.useState(false);

  async function fetchNotications() {
    const notifications = await GetAllNotifications();
    if (notifications.success) {
      setNotifications(notifications.data);
    }
  }

  const Unread = notifications?.filter(
    (notification) => !notification.isRead
  ).length;

  React.useEffect(() => {
    fetchNotications();
  }, []);

  return (
    <>
      <Badge
        status="warning"
        color="blue"
        className="cursor-pointer"
        count={Unread}
        onClick={() => {
          ReadAllNotifications();
          setShowNotifications(true);
        }}
      >
        <Avatar
          shape="circle"
          size="large"
          icon={<i className="ri-notification-3-line text-2xl text-bold" />}
        />
      </Badge>
      {showNotifications && (
        <NotificationPopup
          fetchNotications={fetchNotications}
          notifications={notifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />
      )}
    </>
  );
}
