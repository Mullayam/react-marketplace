const router = require("express").Router();
const Products = require("../../controllers/product/Products");
const VerifyUserAccess = require("../../middlewares/verifyLoginAccess");
const { storage2 } = require("../../utils/UploadHandler");
const multer = require("multer");
// Products Routes

router.post("/add-new-product", VerifyUserAccess, Products.AddNewProduct);
router.post("/get-all-products", VerifyUserAccess, Products.GetAllProducts);
router.put("/edit-product/:productId", VerifyUserAccess, Products.EditProduct);
router.delete(
  "/delete-product/:productId",
  VerifyUserAccess,
  Products.DeleteProduct
);
// images Routes

router.post(
  "/upload-images",
  VerifyUserAccess,
  multer({ storage2 }).single("filefield"),
  Products.UploadFile
);

router.put(
  "/edit-product-status/:productId",
  VerifyUserAccess,
  Products.EditProductStatus
);
router.get(
  "/get-product/:productId",
  VerifyUserAccess,
  Products.GetProductById
);
router;
module.exports = router;
