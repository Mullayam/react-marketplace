import React from "react";
import Header from "./Header";
import { AuthContext } from "../services/user";

function RootLayout({ user, children }) {
  return (
    <AuthContext.Provider value={user}>
      <Header />
      <div className="container-fluid mt-1 p-5"> {children}</div>
    </AuthContext.Provider>
  );
}

export default RootLayout;
