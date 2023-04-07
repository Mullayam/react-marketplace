const router = require("express").Router();
const Notification = require("../../controllers/user/Notification");
const VerifyUserAccess = require("../../middlewares/verifyLoginAccess");

router.delete(
  "/delete/:notificationId",
  VerifyUserAccess,
  Notification.DeleteNotfications
);
router.post("/new-alert", VerifyUserAccess, Notification.Alert);
router.post(
  "/all-notifications",
  VerifyUserAccess,
  Notification.AllNotfications
);
router.put(
  "/read-notifications",
  VerifyUserAccess,
  Notification.ReadAllNotfications
);
module.exports = router;
