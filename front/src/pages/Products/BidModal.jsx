import { Form, Input, Modal } from "antd";
import React from "react";
import taost from "react-hot-toast";
import { VALIDATION_RULES } from "../../helpers/ValidationRules";
import UserInfo from "../../helpers/UserInfo";
import { PlaceNewBid } from "../../services/bids";
import { SendAlert } from "../../services/notifications";

export default function BidModal({
  bidData: { productId, buyer, seller },
  showBidModal,
  setBidModal,
  productName,
}) {
  const { name } = UserInfo();
  const ModalRef = React.useRef();
  async function handleBidSubmit(values) {
    try {
      const response = await PlaceNewBid({
        ...values,
        product: productId,
        buyer,
        seller,
      });
      await SendAlert({
        title: "New Bid Place",
        user: seller,
        onclick: `/profile/${productId}`,
        messages: `Someone Placed a new Bid on your Product named as ${productName}, By ${name} for an amount of${values.bidAmount}`,
      });
      if (response.success) {
        taost.success(response.message);
        setBidModal(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      taost.error(error.message);
    }
  }
  return (
    <Modal
      onCancel={() => setBidModal(false)}
      open={showBidModal}
      width={600}
      centered
      onOk={() => ModalRef.current.submit()}
    >
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-orange-700 text-center">
          Place a Bid
        </h1>
        <Form layout="vertical" ref={ModalRef} onFinish={handleBidSubmit}>
          <Form.Item
            label="Bidding Amount"
            name="bidAmount"
            rules={VALIDATION_RULES}
          >
            <Input type="number" inputMode="numeric" />
          </Form.Item>
          <Form.Item
            label="Your Contant Number"
            name="mobile"
            rules={VALIDATION_RULES}
          >
            <Input type="number" inputMode="numeric" />
          </Form.Item>
          <Form.Item label="Message" name="message" rules={VALIDATION_RULES}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
