import React from "react";
import { Button, Table } from "antd";
import ProductsModal from "./ProductsModal";
import moment from "moment";
import UserInfo from "../../../helpers/UserInfo";
import {
  GetAllProducts,
  DeleteProduct as RemoveProduct,
} from "../../../services/products";
import { toast } from "react-hot-toast";
import DisplayBidsModal from "./DisplayBidsModal";

export default function ProductsForm() {
  const [allProducts, setAllProducts] = React.useState([]);
  const [showProductsModal, setProductsModal] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [showBids, setShowBids] = React.useState(false);
  const { _id } = UserInfo();

  const GetProducts = async () => {
    try {
      const products = await GetAllProducts({ seller: _id });
      if (products.success) {
        setAllProducts(products.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function DeleteProduct(id) {
    const rep = await RemoveProduct(id);
    if (rep.success) {
      GetProducts();
      toast.success(rep.message);
    } else {
      GetProducts();
      toast.error(rep.message);
    }
  }
  const Columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Age",
      dataIndex: "age",

      key: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, data) => {
        return moment(data.createdAt).format("DD-MM-YYYY");
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="flex gap-5">
            <i
              onClick={() => {
                setSelectedProduct(record);
                setProductsModal(true);
              }}
              className="ri-edit-line"
            ></i>
            <i
              onClick={() => {
                DeleteProduct(record._id);
              }}
              className="ri-close-circle-fill"
            ></i>
            <span
              className="cursor-pointer"
              onClick={() => {
                setShowBids("true");
                setSelectedProduct(record);
              }}
            >
              Show Bids
            </span>
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
      <div className="flex justify-end">
        <Button
          className="mb-2"
          type="default"
          onClick={() => {
            setSelectedProduct(null);
            setProductsModal(!showProductsModal);
          }}
        >
          Add New Product
        </Button>
      </div>
      <Table columns={Columns} dataSource={allProducts} />

      {showProductsModal && (
        <ProductsModal
          title={selectedProduct ? "Edit Product" : "Add New Product"}
          showProductsModal={showProductsModal}
          setProductsModal={setProductsModal}
          selectedProduct={selectedProduct}
          GetProducts={GetProducts}
        />
      )}
      {showBids && (
        <DisplayBidsModal
          displayBids={showBids}
          setDisplayBids={setShowBids}
          selectedProduct={selectedProduct}
          GetProducts={GetProducts}
        />
      )}
    </div>
  );
}
