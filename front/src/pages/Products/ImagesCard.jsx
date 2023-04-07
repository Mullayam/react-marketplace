import React from "react";
import moment from "moment";
export default function ImagesCard({
  product,
  selectedImageKey,
  setSelectedImageKey,
}) {
  let NoPNGURL =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf4uEbtb1VTclMc8SPPWsQpQUCEOHUORs5Y4iCYWCe&s";
  return (
    <div className="flex flex-col gap-2">
      <img
        className="w-full h-96 object-cover rounded-md "
        src={
          product.images?.length ? product.images[selectedImageKey] : NoPNGURL
        }
        alt={product.name}
      />

      <div className="flex gap-5">
        {product.images?.map((image, index) => (
          <img
            className={
              "w-20 h-20 rounded-md object-cover" +
              (selectedImageKey === index
                ? "border-2px border-green-500 border-dashed p-2"
                : "")
            }
            src={image}
            key={image}
            alt=""
            onClick={() => setSelectedImageKey(index)}
          />
        ))}
      </div>
      <hr className="m-2" />
      <div className="flex gap-5">
        <div className="text-gray-600">Added On</div>
        <h1>{moment(product.createdAt).format("DD-MM-YYYY, hh:mm:ss A")}</h1>
      </div>
    </div>
  );
}
