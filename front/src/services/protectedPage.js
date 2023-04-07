import React from "react";
import { CheckCurrentUser } from "./user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RootLayout from "../components/layout";

function PrivateRoutes({ children }) {
  const [user, setUser] = React.useState(null);
  const redirect = useNavigate();
  async function ValidateUserToken() {
    try {
      const { data, success, message } = await CheckCurrentUser();

      if (data?.token) {
        toast.error("Please Login First");
        redirect("/login");
      }
      if (typeof success === "undefined") {
        redirect("/error");
        throw new Error("Internal Server Error");
      }
      if (success) {
        setUser(data);
      } else {
        throw new Error(message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      ValidateUserToken();
    } else {
      toast.error("Please Login First");
      redirect("/login");
    }
  }, []);

  return user && <RootLayout user={user}>{children} </RootLayout>;
}
export default PrivateRoutes;
