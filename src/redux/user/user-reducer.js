const userReducer = (
  state = {
    loading: false,
    error: "",
  },
  action
) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case "REMOVE_USER":
      delete state.data;
      return {
        ...state,
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
    default:
      return state;
  }
};
export default userReducer;
