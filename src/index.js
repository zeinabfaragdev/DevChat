import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";

const Root = () => {
  let user = useSelector((state) => state.user.data);
  console.log("ROOT", user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={user ? <App /> : <Login />} />
        <Route path="/register" element={user ? <App /> : <Register />} />
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
