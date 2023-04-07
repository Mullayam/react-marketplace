import React from "react";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { GetProductById } from "../../services/products";
import { GetAllBids } from "../../services/bids";
import UserInfo from "../../helpers/UserInfo";
import ImagesCard from "./ImagesCard";
import DetailsTab from "./DetailsTab";

export default function ProductDetails() {
  const [selectedImageKey, setSelectedImageKey] = React.useState(0);
  const [getProducts, setGetProducts] = React.useState([]);

  const { productId } = useParams();

  const user = UserInfo();
  async function GetProductByIdOnly() {
    try {
      const resposne = await GetProductById(productId);
      if (resposne.success) {
        const GetBids = await GetAllBids({ product: productId });
        setGetProducts({ ...resposne.data, bids: GetBids });
      } else {
        throw new Error(resposne.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  React.useEffect(() => {
    GetProductByIdOnly();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-5">
      {getProducts && (
        <ImagesCard
          setSelectedImageKey={setSelectedImageKey}
          selectedImageKey={selectedImageKey}
          product={getProducts}
        />
      )}

      <DetailsTab product={getProducts} />
    </div>
  );
}
