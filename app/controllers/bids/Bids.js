const BidsModel = require("../../models/BidsModel");
const SendResponse = require("../../utils/response");

class Bids {
  async NewBid(req, res) {
    try {
      const PlaceNewBid = new BidsModel(req.body);
      await PlaceNewBid.save();
      SendResponse(res, true, {}, "Bid Placed Successfully");
    } catch (error) {
      SendResponse(res, false, {}, error.message);
    }
  }
  async GetAllPlacedBids(req, res) {
    try {
      const { product, seller, buyer } = req.body;

      let filters = {};

      if (product) {
        filters.product = product;
      }
      if (seller) {
        filters.seller = seller;
      }
      if (buyer) {
        filters.buyer = buyer;
      }

      const BidsData = await BidsModel.find(filters)
        .populate("product")
        .populate("buyer")
        .populate("seller");
      console.log(filters);
      SendResponse(res, true, BidsData, "");
    } catch (error) {
      SendResponse(res, false, {}, error.message);
    }
  }
}
module.exports = new Bids();
