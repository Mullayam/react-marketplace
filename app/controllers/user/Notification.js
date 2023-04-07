const NotificationModal = require("../../models/NotificationModal");
const SendResponse = require("../../utils/response");

class Notification {
  async Alert(req, res) {
    try {
      const NewNotification = await NotificationModal(req.body);
      await NewNotification.save();
      SendResponse(res, true, {}, "");
    } catch (error) {
      SendResponse(res, false, {}, error.message);
    }
  }
  async AllNotfications(req, res) {
    try {
      const notifications = await NotificationModal.find({
        user: req.body.userId,
      }).sort({ createdAt: -1 });

      SendResponse(res, true, notifications, "true");
    } catch (error) {
      SendResponse(res, false, {}, error.message);
    }
  }
  async DeleteNotfications(req, res) {
    try {
      await NotificationModal.findByIdAndDelete(req.params.notificationId);

      SendResponse(res, true, {}, "Notification Deleted Successfully");
    } catch (error) {
      SendResponse(res, false, {}, error.message);
    }
  }
  async ReadAllNotfications(req, res) {
    try {
      await NotificationModal.updateMany(
        {
          user: req.body.userId,
          read: false,
        },
        { $set: { read: true } }
      );

      SendResponse(res, true, {}, "Marked As Read All");
    } catch (error) {
      SendResponse(res, false, {}, error.message);
    }
  }
}
module.exports = new Notification();
