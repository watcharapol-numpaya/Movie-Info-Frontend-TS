import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {  useSelector } from "react-redux"; 


const ProtectRouteOnSignIn = ({ redirectPath = "/home", children }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  if (accessToken) {
    return <Navigate to={redirectPath}   />;
  }

  return children || <Outlet />;
};

export default ProtectRouteOnSignIn;
