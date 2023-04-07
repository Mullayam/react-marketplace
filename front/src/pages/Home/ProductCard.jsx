import { Link } from "react-router-dom";
import React from "react";

export default function ProductCard({ product }) {
  // const redirect = useNavigate()
  return (
    <Link
      className="no-underline cursor-pointer"
      to={`/product/${product._id}/${product.name
        .toLowerCase()
        .split(" ")
        .join("-")}`}
    >
      <div className="border border-gray-300 rounded border-solid flex flex-col pb-2 ">
        <img
          src={product.images[0]}
          className="w-full h-52"
          alt={product.name}
        />
        <hr />
        <div className="px-2 gap-2">
          <div className="text-lg font semibold">
            <h1>{product.name}</h1>
          </div>
          <p className="text-sm text-gray-500">{product.description}</p>
          <span className="text-xl text-green-700">Rs.{product.price}/-</span>
        </div>
      </div>
    </Link>
  );
}
