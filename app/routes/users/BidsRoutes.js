const router = require("express").Router();
const Bids = require("../../controllers/bids/Bids");
const VerifyUserAccess = require("../../middlewares/verifyLoginAccess");

router.post("/place-new-bid", VerifyUserAccess, Bids.NewBid);
router.post("/get-all-bids", VerifyUserAccess, Bids.GetAllPlacedBids);

module.exports = router;
