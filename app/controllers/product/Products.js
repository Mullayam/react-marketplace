const ProductsModel = require("../../models/ProductsModel");
const UserModal = require("../../models/UserModel");
const NotificationModal = require("../../models/NotificationModal");
const SendResponse = require("../../utils/response");
const cloudinary = require("../../config/Cloudinary");

class Products {
  // Add a new Product
  static async AddNewProduct(req, res) {
    try {
      const NewProduct = await ProductsModel(req.body);
      await NewProduct.save();
      const GetOnlyAdmins = await UserModal.find({ roles: "admin" });
      GetOnlyAdmins.forEach(async (admin) => {
        const notify = await NotificationModal({
          user: admin._id,
          title: "New Product Added",
          message: `A New Product has been added by ${req.user.name},Checkout it`,
          onclick: "/admin/",
          isRead: false,
        });
        await notify.save();
      });
      SendResponse(res, true, {}, "New Product is Added Successfully");
    } catch (error) {
      SendResponse(res, false, {}, "Something Went Wrong");
    }
  }
  // Get All Products
  static async GetAllProducts(req, res) {
    const { seller, category = [], age = [], status } = req.body;

    let filters = {};
    if (seller) {
      filters.seller = seller;
    }
    if (status) {
      filters.status = status;
    }
    if (category.length > 0) {
      filters.category = { $in: category };
    }
    if (age.length > 0) {
      age.forEach((item) => {
        filters.age = { $gte: item.split("-")[0], $lte: item.split("-")[1] };
      });
    }
    try {
      const AllProducts = await ProductsModel.find(filters)
        .populate("seller")
        .sort({
          createdAt: -1,
        });

      SendResponse(res, true, AllProducts, "All Products are Fetched");
    } catch (error) {
      SendResponse(res, false, {}, "Something Went Wrong");
    }
  }
  // Edit Product By Id
  static async EditProduct(req, res) {
    try {
      await ProductsModel.findByIdAndUpdate(req.params.productId, req.body);

      SendResponse(res, true, {}, "Product Updated Successfully");
    } catch (error) {
      SendResponse(res, false, {}, "Something Went Wrong");
    }
  }
  // Delete Product By Id
  static async DeleteProduct(req, res) {
    try {
      await ProductsModel.findByIdAndDelete(req.params.productId);

      SendResponse(res, true, {}, "Product Deleted Successfully");
    } catch (error) {
      SendResponse(res, false, {}, "Something Went Wrong");
    }
  }
  //upload product image to cloudinary
  static async UploadFile(req, res) {
    try {
      const result = await cloudinary.uploader.upload(req.file, {
        folder: "enjoys",
      });

      const productId = req.body.producId;

      await ProductsModel.findByIdAndUpdate(productId, {
        $push: { images: result.secure.url },
      });

      SendResponse(res, true, {}, "Image Uploaded Successfully");
    } catch (error) {
      SendResponse(res, false, error.message, "Something Went Wrong");
    }
  }
  //update product
  static async EditProductStatus(req, res) {
    try {
      const updatedProduct = await ProductsModel.findByIdAndUpdate(
        req.params.productId,
        {
          status: req.body.status,
        }
      );
      const notify = await NotificationModal({
        user: updatesProduct.seller,
        message: `Your Product added by you is ${req.body.status}`,
        title: "Product Status Changed",
        onclick: `/profile/@${updatedProduct.seller.name}`,
        isRead: false,
      });
      await notify.save();
      SendResponse(
        res,
        true,
        {},
        "Product Status Updated to " + req.body.status
      );
    } catch (error) {
      SendResponse(res, false, {}, "Something Went Wrong");
    }
  }
  static async GetProductById(req, res) {
    try {
      const ThatProduct = await ProductsModel.findById(
        req.params.productId
      ).populate("seller");
      SendResponse(res, true, ThatProduct, "Product Fetched");
    } catch (error) {
      SendResponse(
        res,
        false,
        error.message,
        "Something Went Wrong in getting product"
      );
    }
  }
}

module.exports = Products;
