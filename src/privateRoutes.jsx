import React from "react";
import { Navigate, Outlet } from "react-router";

const PrivateRoutes = () => {
  const storedData = JSON.parse(localStorage.getItem("userstore"));
  const user = storedData?.state?.user;
  if (user) {
    return <Outlet />;
  }
  return <Navigate to={"/login"} />;
};

export default PrivateRoutes;
