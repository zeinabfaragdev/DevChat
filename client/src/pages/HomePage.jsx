import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/user/user-actions";
import { Link } from "react-router-dom";

const HomePage = ({ user }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1> Welcome {user.username}!</h1>
      {user.username ? (
        <button onClick={() => dispatch(signOut())}>Sign Out</button>
      ) : (
        <Link to="/login"> Sign In</Link>
      )}
    </div>
  );
};

export default HomePage;
