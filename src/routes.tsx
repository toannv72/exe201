import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Page/Authenticator/Login/Login";
import Home from "./Page/Authenticator/Home/Home";
import Product from "./Page/Authenticator/Product/Product";
import PageNotFound from "./Page/Authenticator/404/PageNotFound";
import Reissue from "./Page/Authenticator/Reissue/Reissue";
import PaymentPage from "./Page/Authenticator/Payment/Payment"; 
import TableProduct from "./Page/admin/TableProduct";
import CreateProduct from "./Page/admin/CreateProduct";
import Order from "./Page/Authenticator/Order/Order"; 
import Logout from "./Page/Authenticator/Logout/Logout"; 
import TableOrder from "./Page/admin/TableOrder"; 
import Invoice from "./Page/Authenticator/Payment/Invoice";
import Required from "./Page/Authenticator/Required/Required"
import RequiredSuccess from "./Page/Authenticator/Required/RequiredSuccess"
import TableUser from "./Page/Admin2/TableUser";
import Dashboard from "./Page/manager/dashboard";
import ShowAll from "./Page/Authenticator/ShowAll/ShowAll";
import Search from "./Page/Authenticator/Search/Search";
import ProductNew from "./Page/Authenticator/ProductShow/Productnew";
import ProductSold from "./Page/Authenticator/ProductShow/Productsold";
import ProductsAll from "./Page/Authenticator/ProductShow/Productsall";
import OrderRequest from "./Page/Authenticator/Order_Request/OrderRequest";
import TableOrderRequest from "./Page/admin/TableOrderRequest";
export const routers = createBrowserRouter([ 
  { 
    path: "*", 
    element: <PageNotFound />, 
  }, 
  { 
    path: "/",
    element: <Home />, 
  }, 
  { 
    path: "/login", 
    element: <Login />, 
  }, 
  { 
    path: "/logout", 
    element: <Logout />, 
  }, 
  {  
    path: "/reissue", 
    element: <Reissue />, 
  }, 
  { 
    path: "/product/:slug", 
    element: <Product />, 
  }, 
  { 
    path: "/required", 
    element: <Required />
  },
  { 
    path: "/required/bill/:id", 
    element: <RequiredSuccess />
  },
  { 
    path: "/staff/product/create",
    element: <CreateProduct />, 
  }, 
  {
    path: "/staff/product/table", 
    element: <TableProduct />, 
  }, 
  { 
    path: "/payment", 
    element: <PaymentPage />, 
  },{
    path: "/order",
    element: <Order />,
  }, 
  {
    path: "/staff/order",
    element: <TableOrder />,
  },
  {
    path: "/payment/bill/:id",
    element: <Invoice />,
  },
  {
    path: "/admin/tableUser",
    element: <TableUser />,
  },
  {
    path: "/manager/dashboard",
    element: <Dashboard />,
  },
  { 
    path: "/showAll", 
    element: <ShowAll/>, 
  }, 
  { 
    path: "/search/:search", 
    element: <Search/>, 
  },
  { 
    path: "/product/new", 
    element: <ProductNew/>, 
  },
  { 
    path: "/product/sold", 
    element: <ProductSold/>, 
  },
  { 
    path: "/product/all", 
    element: <ProductsAll/>, 
  },
  {
    path: "/orderRequest",
    element: <OrderRequest />, 
  },
  {
    path: "/staff/orderRequest",
    element: <TableOrderRequest />, 
  },
]); 
