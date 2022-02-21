import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import AppLayout from "../components/AppLayout";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignupPage";
export const useCustomRoutes = () => {
  let isLogin = localStorage.getItem("currentUser");

// useEffect(() => {
//   if (performance.navigation.type === 1) {
//     console.info( "This page is reloaded" );
//   } else {

//     window.addEventListener("beforeunload", (ev) => {
//       ev.preventDefault();
//       console.info("asda");
//       localStorage.removeItem("currentUser");
//     });
//   }
// });

  return [
    {
      path: "/",
      element: <AppLayout/>,
    },
    {
      path: "/login",
      element: isLogin ? <Navigate to='/' /> : <LoginPage />,
    },
    {
      path: "/register",
      element: isLogin ? <Navigate to='/' /> : <SignupPage/>,
    },
  ];
};
