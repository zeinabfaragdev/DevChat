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
      };
    case "ADD_CHANNELS":
      return {
        ...state,
        all: action.payload,
        current: action.payload[0],
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
