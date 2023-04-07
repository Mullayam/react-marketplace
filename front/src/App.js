import React from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { router } from "./routes.config";
import Spinner from "./components/Spinner";
const App = () => {
  const { isLoading } = useSelector((state) => state.loader);

  return (
    <>
      {isLoading ? <Spinner /> : null}
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
