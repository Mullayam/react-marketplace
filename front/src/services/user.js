import React from "react";
import { AxiosInstance } from "../apis/axiosInstance";

let UserData;
export const RegisterUser = async (Body) => {
  try {
    const response = await AxiosInstance.post("/c/register", Body);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const LoginUser = async (Body) => {
  try {
    const response = await AxiosInstance.post("/c/login", Body);

    UserData = response.data.data;
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const CheckCurrentUser = async (Body) => {
  try {
    let response = await AxiosInstance.get("/c/get-current-user", Body);

    if (response.data.message === "jwt expired") {
      response.data.data = { ...response.data.data, token: "expired" };
      localStorage.removeItem("token");
    } else {
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 500) {
      return 500;
    } else {
      return error.message;
    }
  }
};

export const GetAllUsers = async () => {
  try {
    const response = await AxiosInstance.get("/c/all-users");

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UpdateUsersStatus = async (userId, Body) => {
  try {
    const response = await AxiosInstance.put(`/c/edit-user-status/${userId}`, {
      status: Body,
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const AuthContext = React.createContext(UserData || null);
