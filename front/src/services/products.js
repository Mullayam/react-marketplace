import { AxiosInstance } from "../apis/axiosInstance";

export const GetAllProducts = async (Body) => {
  try {
    const response = await AxiosInstance.post(
      "/product/get-all-products",
      Body
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const AddNewProduct = async (Body) => {
  try {
    const response = await AxiosInstance.post("/product/add-new-product", Body);

    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const EditProduct = async (productId, Body) => {
  try {
    const response = await AxiosInstance.put(
      `/product/edit-product/${productId}`,
      Body
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const DeleteProduct = async (productId) => {
  try {
    const response = await AxiosInstance.delete(
      `/product/delete-product/${productId}`
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const UploadToServer = async (payload) => {
  try {
    const response = await AxiosInstance.post(
      `/product/upload-images`,
      payload
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UpdateProductStatus = async (productId, Body) => {
  try {
    const response = await AxiosInstance.put(
      `/product/edit-product-status/${productId}`,
      { status: Body }
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const GetProductById = async (productId) => {
  try {
    const response = await AxiosInstance.get(
      `/product/get-product/${productId}`
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};
