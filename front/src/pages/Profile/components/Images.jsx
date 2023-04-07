import { Button, Upload, message } from "antd";
import React from "react";
import { EditProduct, UploadToServer } from "../../../services/products";

export default function Images({
  GetProducts,
  selectedProduct,
  setProductsModal,
}) {
  const [productImg, setProductImg] = React.useState(selectedProduct.images);
  const [files, setFile] = React.useState(null);
  const [imgPreview, setImgPreview] = React.useState(false);
  async function UploadImages() {
    try {
      const form = new FormData();
      form.append("filefield", files);
      form.append("productId", selectedProduct._id);
      const images = await UploadToServer(form);
      if (images.success) {
        setProductImg([...images, images.data]);
        setImgPreview(false);
        setFile(null);
        GetProducts();
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function DeleteOnlyImage(image) {
    try {
      const NewImages = await productImg.filter((img) => img !== image);
      const UpdatedData = await EditProduct(selectedProduct._id, {
        ...selectedProduct,
        images: NewImages,
      });
      if (UpdatedData.success) {
        message.success(UpdatedData.message);
      } else {
        throw new Error("Something went wrong with deleting Image");
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  return (
    <div>
      <div className="flex gap-5 p-5">
        {productImg.map((img) => {
          return (
            <div className="flex gap-2 border border-soli border-gray-300 rounded p-2 item-end">
              <img src={img} className="h-20 w-20 object-cover" alt="d" />
              <i
                className="ri-delete-bin-line"
                onClick={() => {
                  DeleteOnlyImage(img);
                }}
              />
            </div>
          );
        })}
      </div>
      <Upload
        listType="picture"
        beforeUpload="false"
        fileList={files ? [files] : []}
        showUploadList={imgPreview}
        onChange={(info) => {
          setFile(info.file);
          setImgPreview(true);
        }}
      >
        <Button type="dashed">Upload Images</Button>
      </Upload>
      <div className="flex justify-end gap-5 mt-6">
        <Button type="success" onClick={() => setProductsModal(false)}>
          Cancel
        </Button>
        <Button type="default" onClick={UploadImages} disabled={!files}>
          Upload
        </Button>
      </div>
    </div>
  );
}
