import React from "react";
import { Button, Popover } from "antd";
import BidModal from "./BidModal";
import UserInfo from "../../helpers/UserInfo";

export default function BidsCard({ productName, productId, WhoIsSeller }) {
  const [showBidModal, setBidModal] = React.useState(false);
  const user = UserInfo();
  const WhoIsUser = user._id === WhoIsSeller ? true : false;
  const Data = {
    productId,

    buyer: user._id,
    seller: WhoIsSeller,
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-2xl text-gray-500">Bids</h1>
        <Button
          disabled={WhoIsUser}
          type="default"
          onClick={() => setBidModal(true)}
        >
          {WhoIsUser ? (
            <Popover
              content={"Seller Cannot Place Bid on own Product"}
              title="NAaaaaaah..."
            >
              Place A Bid
            </Popover>
          ) : (
            "Place A Bid"
          )}
        </Button>
      </div>
      <hr className="mt-2" />

      <BidModal
        productName={productName}
        bidData={Data}
        showBidModal={showBidModal}
        setBidModal={setBidModal}
      />
    </div>
  );
}
