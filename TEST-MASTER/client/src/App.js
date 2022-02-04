import "./App.css";
import "./style.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";

import React from "react";
import store from "./store";
import { Provider } from "react-redux";

// Component Imports
import LoginPage from "./components/LoginPage/index";
import SignupPage from "./components/SignupPage/index";
import NoPage from "./components/ErrorPage/index";
import AppLayout from "./components/AppLayout/index";
import { loginUser } from "./store/actions/userActions";
import { useCustomRoutes } from "./navigation/useCustomRoutes";

function App() {
  const routes = useRoutes(useCustomRoutes());
  return <Provider store={store}>{routes}</Provider>;
}

export default App;
