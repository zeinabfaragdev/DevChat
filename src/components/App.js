import "./App.css";
import { useDispatch } from "react-redux";
import { signOut, getUser } from "../redux/user/user-actions";

function App() {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Hell0oo</h1>
      <button onClick={() => dispatch(getUser())}>Get User </button>
      <button onClick={() => dispatch(signOut())}>Sign Out</button>
    </div>
  );
}

export default App;
