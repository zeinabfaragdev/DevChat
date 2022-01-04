import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut, getUser } from "../redux/user/user-actions";

function App() {
  const username = useSelector((state) => state.user.data.username);
  const dispatch = useDispatch();

  useEffect(() => {
    !username && dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      <h1>Welcome {username}</h1>
      <button onClick={() => dispatch(getUser())}>Get User </button>
      <button onClick={() => dispatch(signOut())}>Sign Out</button>
    </div>
  );
}

export default App;
