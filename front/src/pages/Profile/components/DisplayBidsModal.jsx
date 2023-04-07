import React from "react";
import { Modal, Table } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/slices/loaderSlice";
import { toast } from "react-hot-toast";
import { GetAllBids } from "../../../services/bids";
export default function DisplayBidsModal({
  selectedProduct,
  displayBids,
  setDisplayBids,
}) {
  const dispatch = useDispatch();
  const [bidsdata, setBidsData] = React.useState(null);
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllBids({ product: selectedProduct?._id });

      if (response.success) {
        setBidsData(response.data);
        console.log(bidsdata);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(setLoader(false));
  };

  // bidsdata.length === 0 && toast.error("No Bids Placed For this Product");
  const Columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, records) => {
        return records.buyer.name;
      },
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Contacts",
      dataIndex: "mobile",
      render: (text, records) => {
        return (
          <div>
            <span>Phone : {records.mobile}</span>
            <span>Email : {records.buyer.email}</span>
          </div>
        );
      },
    },

    {
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
    <Modal
      width={1200}
      title={`${selectedProduct?.name}  -Bids `}
      open={displayBids}
      onCancel={setDisplayBids(false)}
      footer={null}
    >
      <div className="flex gap-3 flex-col">
        <div className="text-xl text-gray-500">
          Product Name : {selectedProduct?.name}
        </div>
        <Table columns={Columns} dataSource={bidsdata} />
      </div>
    </Modal>
  );
}
