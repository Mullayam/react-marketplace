import React from "react";
import moment from "moment";

export default function BidsPlaceInfo({ product }) {
  return (
    <div>
      {product.showBidsOnProducts &&
        product.bids?.data.map((b) => {
          return (
            <div
              key={b._id}
              className="border mt-2 border-gray-500 border-solid p-3 rounded"
            >
              <div className="flex justify-between m-2">
                <span>Name</span>
                <span className="text-semibold">{b.buyer.name}</span>
              </div>
              <div className="flex justify-between m-2">
                <span>Bid Amount</span>
                <span className="text-semibold">Rs.{b.bidAmount}/-</span>
              </div>
              <div className="flex justify-between m-2">
                <span>Bid Amount</span>
                <span className="text-semibold">
                  {moment(b.createdAt).format("DD-MM-YYYY")}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
