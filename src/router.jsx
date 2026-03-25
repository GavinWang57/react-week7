import { createHashRouter } from "react-router-dom";
import FrontendLayout from "./layout/FrontendLayout";
import Home from "./views/front/Home";
import Products from "./views/front/Products";
import SingleProduct from "./views/front/SingleProduct";
import Cart from "./views/front/Cart";
import Checkout from "./views/front/Checkout";
import Login from "./views/Login";
import AdminLayout from "./layout/AdminLayout";
import AdminProductTable from "./views/admin/AdminProductTable";
import AdminOrders from "./views/admin/AdminOrders";
import NotFound from "./views/front/NotFound";

export const routes = createHashRouter([
  {
    path: "/",
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "login",
        element: <Login />,
      },

      //   { path: "products", element: <Products /> },
      //   { path: "products/:id", element: <SingleProduct /> },
      //   { path: "cart", element: <Cart /> },
      //   { path: "*", element: <NotFound /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "admin-products",
        element: <AdminProductTable />,
      },
      {
        path: "admin-orders",
        element: <AdminOrders />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
