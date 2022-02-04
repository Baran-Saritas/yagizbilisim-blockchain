import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import AppLayout from "../components/AppLayout";
import LoginPage from "../components/LoginPage";

export const useCustomRoutes = () => {
  let isLogin = localStorage.getItem("currentUser");

  window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    localStorage.removeItem("currentUser");
  });
  return [
    {
      path: "/",
      element: <AppLayout />,
    },
    {
      path: "/login",
      element: isLogin ? <Navigate to='/' /> : <LoginPage />,
    },
    {
      path: "/register",
      element: isLogin ? <Navigate to='/' /> : <LoginPage />,
    },
  ];
};
