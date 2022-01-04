import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import axios from "axios";

axios.defaults.withCredentials = true;

const Root = () => {
  const username = useSelector((state) => state.user.data.username);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/login"
          element={username ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={username ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </Router>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);
