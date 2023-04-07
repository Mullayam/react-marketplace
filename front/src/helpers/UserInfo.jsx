import React, { useContext } from "react";
import { AuthContext } from "../services/user";

export default function UserInfo() {
  return useContext(AuthContext);
}
