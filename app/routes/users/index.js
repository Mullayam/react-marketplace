const router = require('express').Router()
const Auth = require('../../controllers/user/AuthController')
const VerifyUserAccess= require('../../middlewares/verifyLoginAccess')
// Auth Routes
router.post("/register", Auth.Registeration);
router.post("/login", Auth.Login);
// get Current User //
router.get("/get-current-user", VerifyUserAccess, Auth.GetCurrentUser);
router.get("/all-users", VerifyUserAccess, Auth.AllUsers);

router.put(
  "/edit-user-status/:userId",
  VerifyUserAccess,
  Auth.UpdateStatusOfUsers
);


 
module.exports = router