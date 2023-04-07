import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PrivateRoutes from "./services/protectedPage";
import ServerError from "./error/500";
import Admin from "./pages/Admin/dashboard";
import ProductDetails from "./pages/Products/ProductDetails";

export const router = createBrowserRouter([
  // protected routes
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <Home />
      </PrivateRoutes>
    ),
  },

  //Private Routes
  {
    path: "/profile/:username?",
    element: (
      <PrivateRoutes>
        <Profile />
      </PrivateRoutes>
    ),
  },
  {
    path: "/product/:productId/:productName?",
    element: (
      <PrivateRoutes>
        <ProductDetails />
      </PrivateRoutes>
    ),
  },
  {
    path: "/admin/:username?",
    element: (
      <PrivateRoutes>
        <Admin />
      </PrivateRoutes>
    ),
  },
  // auth
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <ServerError />,
  },
]);
// export const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/">
//       <Route path="/" element={<PrivateRoutes />}>
//         <Route path="/home" element={<Home />} />
//         <Route path="/profile/:username?" element={<Profile />} />
//       </Route>

//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//     </Route>
//   )
// );
