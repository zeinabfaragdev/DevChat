const INITIAL_STATE = {
  current: {},
  all: [],
};

const channelReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_CHANNEL":
      return {
        ...state,
        all: [...state.all, action.payload],
        current: state.current ? state.current : action.payload,
      };
    case "UPDATE_CHANNEL":
      return {
        ...state,
        all: state.all.map((channel) =>
          channel._id === action.payload._id ? action.payload : channel
        ),
        current:
          action.payload._id === state.current._id
            ? action.payload
            : state.current,
      };
    case "ADD_CHANNELS":
      return {
        ...state,
        current: action.payload[0],
        all: action.payload,
      };
    case "SET_CURRENT_CHANNEL":
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
};

export default channelReducer;
