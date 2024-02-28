import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Page/Authenticator/Login/Login";
import PageNotFound from "./Page/Authenticator/404/PageNotFound";
import Reissue from "./Page/Authenticator/Reissue/Reissue";
import TableProduct from "./Page/admin/TableProduct";
import CreateProduct from "./Page/admin/CreateProduct";
import Logout from "./Page/Authenticator/Logout/Logout"; 
import TableOrder from "./Page/admin/TableOrder"; 
import TableUser from "./Page/Admin2/TableUser";
import Dashboard from "./Page/manager/dashboard";
import TableOrderRequest from "./Page/admin/TableOrderRequest";
import Home from "./Page/Authenticator/Home/Home";
import Services from "./Page/Authenticator/Home/Services";
import About from "./Page/Authenticator/Home/About";
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
    path: "/services",
    element: <Services />, 
  }, 
  { 
    path: "/about",
    element: <About />, 
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
    path: "/staff/product/create",
    element: <CreateProduct />, 
  }, 
  {
    path: "/staff/product/table", 
    element: <TableProduct />, 
  },
  {
    path: "/staff/order",
    element: <TableOrder />,
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
    path: "/staff/orderRequest",
    element: <TableOrderRequest />, 
  },
]); 
