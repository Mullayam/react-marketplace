const mongoose = require("mongoose");
const BidSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    bidAmount: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Bids = mongoose.model("bids", BidSchema);
module.exports = Bids;
