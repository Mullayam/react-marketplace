import React from "react";
import BidsCard from "./BidsCard";
import BidsPlaceInfo from "./BidsPlaceInfo";
import moment from "moment";

export default function DetailsTab({ product }) {
  return (
    <div className="flex flex-col gap-5 text-md p-2">
      <h1 className="text-2xl font-semibold text-orange-900">{product.name}</h1>
      <span className="font-semibold">{product.description}</span>
      <hr />
      <div className="">
        <h1 className="text-2xl font-semibold text-orange-400">
          Product Details
        </h1>
        <div className="flex justify-between mt-2">
          <span className="font-semibold">Price</span>
          <span className="font-semibold">Rs.{product.price} /-</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold">Category</span>
          <span className="font-semibold">Rs.{product.price} /-</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold">Bill Available</span>
          <span className="font-semibold">
            {product.billAvailable ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold">Warranty</span>
          <span className="font-semibold">
            {product.warranty ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold">Box Available</span>
          <span className="font-semibold">
            {product.boxAvailable ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold">Accessories</span>
          <span className="font-semibold">
            {product.accessories ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold">Purchased Date</span>
          <span className="font-semibold">
            {moment().subtract(product.age, "years").format("YYYY")} (
            {product.age} years ago)
          </span>
        </div>
      </div>
      <hr />
      <div className="">
        <h1 className="text-2xl font-semibold text-orange-400">
          Other Details
        </h1>
        <div className="flex justify-between mt-2">
          <span className="font-semibold">Seller</span>
          <span className="font-semibold">{product.seller?.name} </span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold">Email</span>
          <span className="font-semibold">{product.seller?.email}</span>
        </div>
      </div>
      <hr />
      <BidsCard
        productName={product.name}
        productId={product._id}
        WhoIsSeller={product.seller?._id}
      />
      <BidsPlaceInfo product={product} />
    </div>
  );
}
