import React from "react";

import { Modal, Table } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/slices/loaderSlice";
import { toast } from "react-hot-toast";
import { GetAllBids } from "../../../services/bids";
import UserInfo from "../../../helpers/UserInfo";

export default function UserBids() {
  const dispatch = useDispatch();
  const [bidsdata, setBidsData] = React.useState(null);
  const { _id } = UserInfo();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllBids({ buyer: _id });

      if (response.success) {
        setBidsData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(setLoader(false));
  };

  const Columns = [
    {
      key: "1",
      title: "Product Name",
      dataIndex: "name",
      render: (text, records) => {
        return records.product.name;
      },
    },
    {
      key: "2",
      title: "Price",
      dataIndex: "price",
      render: (text, records) => {
        return records.product.price;
      },
    },
    {
      key: "3",
      title: "Seller",
      dataIndex: "seller",
      render: (text, records) => {
        return records.seller.name;
      },
    },
    {
      key: "4",
      title: "Message",
      dataIndex: "message",
    },
    {
      key: "5",
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      key: "6",
      title: "Contacts",
      dataIndex: "mobile",
      render: (text, records) => {
        return (
          <div>
            <span>Phone : {records.mobile}</span>
            <br />
            <span>Email : {records.buyer.email}</span>
          </div>
        );
      },
    },

    {
      key: "7",
      title: "Bidding Date",
      dataIndex: "createdAt",
      render: (text, records) => {
        return moment(records.createdAt).format("DD-MM-YYYY");
      },
    },
  ];
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex gap-3 flex-col">
      <div className="text-xl text-gray-500">UserBids</div>
      <Table columns={Columns} dataSource={bidsdata} />
    </div>
  );
}
