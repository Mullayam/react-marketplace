const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    messages: {
      type: String,
      required: true,
    },
    onclick: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Notifications = mongoose.model("notifications", NotificationSchema);
module.exports = Notifications;
