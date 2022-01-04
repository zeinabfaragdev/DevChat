import "./App.css";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/user/user-actions";

function App() {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Hell0oo</h1>
      <button onClick={() => dispatch(removeUser())}>Sign Out</button>
    </div>
  );
}

export default App;
