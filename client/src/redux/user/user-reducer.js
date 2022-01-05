const DEFAULT_USER_DATA = {
  username: "",
  avatar: "",
  email: "",
};

const INITIAL_STATE = {
  loading: false,
  error: "",
  data: DEFAULT_USER_DATA,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case "REMOVE_USER":
      return {
        ...state,
        data: DEFAULT_USER_DATA,
      };
    case "START_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "END_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "ADD_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "REMOVE_ERROR":
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};
export default userReducer;
