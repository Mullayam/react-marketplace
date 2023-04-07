const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
    billAvailable: { type: Boolean, default: false },
    warranty: { type: Boolean, default: false },
    accessories: { type: Boolean, default: false },
    boxAvailable: { type: Boolean, default: false },
    showBidsOnProducts: { type: Boolean, default: false },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
const Products = mongoose.model("products", ProductSchema);
module.exports = Products;
