import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/user/user-actions";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Spinner from "./components/Spinner";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user.loading ? <Spinner /> : <HomePage user={user.data} />}
        />
        <Route
          path="/login"
          element={user.data.username ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user.data.username ? <Navigate to="/" /> : <RegisterPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
