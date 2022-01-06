import axios from "axios";

export const addChannel = (channel) => {
  return {
    type: "ADD_CHANNEL",
    payload: channel,
  };
};

export const addChannels = (channels) => {
  return {
    type: "ADD_CHANNELS",
    payload: channels,
  };
};

export const addChannelRequest = (channel) => {
  return (dispatch) => {
    axios
      .post("/api/channel", channel)
      .then((res) => {
        dispatch(addChannel(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getChannels = () => {
  return (dispatch) => {
    axios
      .get("/api/channel")
      .then((res) => {
        dispatch(addChannels(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setCurrentChannel = (channel) => {
  return {
    type: "SET_CURRENT_CHANNEL",
    payload: channel,
  };
};
