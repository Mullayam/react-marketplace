import React from "react";
import { Table, Popover, Button } from "antd";

import moment from "moment";
import UserInfo from "../../helpers/UserInfo";
import { GetAllProducts, UpdateProductStatus } from "../../services/products";
import { toast } from "react-hot-toast";
const content = {
  pending: () => {
    return (
      <div>
        <p> Status is Still Pending,Please Approve Product</p>
        <p>Click To Approve </p>
      </div>
    );
  },
  approve: () => {
    return (
      <div>
        <p> Status is Still Pending,Please Approve Or Reject Product</p>
      </div>
    );
  },
  blocked: () => {
    return (
      <div>
        <p> Status is Still Blocked,Please Re-Approve Product</p>
        <p>Click To Unblock</p>
      </div>
    );
  },
};

export default function Products() {
  const [allProducts, setAllProducts] = React.useState([]);
  const { _id } = UserInfo();

  const UpdateStatusOfProduct = async (id, Status) => {
    try {
      const response = await UpdateProductStatus(id, Status);
      if (response.success) {
        toast.success(response.message);
        GetProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const GetProducts = async () => {
    try {
      const products = await GetAllProducts(null);
      if (products.success) {
        setAllProducts(products.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Columns = [
    {
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Seller",
      dataIndex: "name",
      render: (text, records) => {
        return records.seller.name;
      },
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, records) => {
        return records.status.toUpperCase();
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text, data) => {
        return moment(data.createdAt).format("DD-MM-YYYY");
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        const { status, _id } = record;

        return (
          <div className="flex gap-3">
            {status === "pending" && (
              <span>
                <Popover content={content.pending} title="Pending ">
                  <Button
                    onClick={() => UpdateStatusOfProduct(_id, "approved")}
                    className="cursor-pointer"
                  >
                    Approve
                  </Button>
                </Popover>
              </span>
            )}
            {status === "pending" && (
              <span>
                <Popover content={content.approve()} title="Rejected ">
                  <Button
                    type="primary"
                    onClick={() => UpdateStatusOfProduct(_id, "rejected")}
                    className="cursor-pointer"
                  >
                    Reject
                  </Button>
                </Popover>
              </span>
            )}
            {status === "approved" && (
              <span>
                <Popover content={content.approve()} title="Approved ">
                  <Button
                    onClick={() => UpdateStatusOfProduct(_id, "blocked")}
                    className="cursor-pointer"
                  >
                    Block
                  </Button>
                </Popover>
              </span>
            )}
            {status === "blocked" && (
              <span>
                <Popover content={content.blocked} title="blocked ">
                  <Button
                    onClick={() => UpdateStatusOfProduct(_id, "approved")}
                    className="cursor-pointer"
                  >
                    Re-Approve
                  </Button>
                </Popover>
              </span>
            )}
            {/* <i onClick={() => {}} className="ri-edit-line"></i> */}
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    GetProducts();
  }, []);
  return (
    <div>
      <Table
        key={Math.random() * 10}
        columns={Columns}
        dataSource={allProducts}
      />
    </div>
  );
}
