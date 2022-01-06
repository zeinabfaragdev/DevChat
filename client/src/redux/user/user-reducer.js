const INITIAL_STATE = {
  authLoading: false,
  userLoading: true,
  error: "",
  data: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        data: action.payload,
        authLoading: false,
        userLoading: false,
        error: "",
      };
    case "REMOVE_USER":
      return {
        ...INITIAL_STATE,
        userLoading: false,
      };
    case "START_AUTH_LOADING":
      return {
        ...state,
        authLoading: true,
      };
    case "END_USER_LOADING":
      return {
        ...state,
        userLoading: false,
      };
    case "ADD_ERROR":
      return {
        ...state,
        error: action.payload,
        authLoading: false,
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
