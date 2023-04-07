const router = require("express").Router();
const UserRoutes = require("./users/")
const ProductsRoutes = require("./users/ProductsRoutes");
const BidRoutes = require("./users/BidsRoutes");
const NotificationRoutes = require("./users/NotificationRoutes");

router.use("/c", UserRoutes);
router.use("/product", ProductsRoutes);
router.use("/bid", BidRoutes);
router.use("/notify", NotificationRoutes);
module.exports = router;
