import React, { useContext } from "react";
import { AuthContext } from "../services/user";
import { useNavigate } from "react-router-dom";
import NotificationBadge from "./Badge";
function Header() {
  const redirect = useNavigate();
  const { name, role } = useContext(AuthContext);
  return (
    <div className="flex justify-between items-center bg-primary p-5">
      <h1
        className="text-2xl text-white"
        onClick={() => {
          redirect("/");
        }}
      >
        EMP
      </h1>

      <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
        <span
          onClick={() => {
            if (role === "admin") {
              window.location.href = `/admin/@${name}`;
            } else {
              window.location.href = `/profile/@${name}`;
            }
          }}
          className="cursor-pointer uppercase"
        >
          {name}
        </span>
        <NotificationBadge />
        <i
          className="ri-logout-box-r-line ml-10"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        />
      </div>
    </div>
  );
}

export default Header;
