import "./App.css";
import "./style.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/login' component={LoginPage}/>
          <Route exact path='/register' component={SignupPage}/>
          <Route path='/'>
          {localStorage.getItem("currentUser") == null ?  (<LoginPage/>):(<AppLayout/>) }
          </Route>
          <Route path='*' component={NoPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
