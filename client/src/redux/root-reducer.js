import { combineReducers } from "redux";
import userReducer from "./user/user-reducer";
import channelReducer from "./channel/channel-reducer";

const rootReducer = combineReducers({
  user: userReducer,
  channels: channelReducer,
});
export default rootReducer;
