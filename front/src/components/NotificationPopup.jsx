import { Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DeleteNotification } from "../services/notifications";
import moment from "moment";
export default function NotificationPopup({
  showNotifications,
  setShowNotifications,
  notifications,
  fetchNotications,
}) {
  const redirect = useNavigate();
  const handelDelete = async (id) => {
    await DeleteNotification(id);
    fetchNotications();
  };
  return (
    <Modal
      title="All Notifications"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
    >
      <div className="flex flex-col gap-2">
        {notifications?.map((n) => {
          return (
            <div
              onClick={() => {
                setShowNotifications(false);
                redirect(n.onclick);
              }}
              key={n._id}
              className="flex flex-col mt-2 border border-solid p-2  curspr-pointer"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-black-500 text-semibold">{n.title}</h1>
                <span className="text-gray-500 text-semibold">
                  {n.messages}
                </span>
                <span className="text-gray-500 text-semibold">
                  {moment(n.createdAt).fromNow()}
                </span>

                <i
                  onClick={handelDelete(n._id)}
                  class="ri-delete-bin-fill text-3xl"
                />
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
