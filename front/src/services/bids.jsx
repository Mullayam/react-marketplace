import { AxiosInstance } from "../apis/axiosInstance";

export const GetAllBids = async (Body) => {
  try {
    const response = await AxiosInstance.post("/bid/get-all-bids", Body);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const PlaceNewBid = async (Body) => {
  try {
    const response = await AxiosInstance.post("/bid/place-new-bid", Body);

    return response.data;
  } catch (error) {
    return error.message;
  }
};
