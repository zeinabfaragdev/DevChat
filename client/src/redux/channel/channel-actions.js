import axios from "axios";
import io from "socket.io-client";

const socket = io("/");

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

export const updateChannel = (channel) => {
  return {
    type: "UPDATE_CHANNEL",
    payload: channel,
  };
};

export const setCurrentChannel = (channel) => {
  return {
    type: "SET_CURRENT_CHANNEL",
    payload: channel,
  };
};

export const addChannelRequest = (channel) => {
  return (dispatch) => {
    axios
      .post("/api/channel", channel)
      .then((res) => {
        socket.emit("new channel", res.data);
        dispatch(setCurrentChannel(res.data));
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

export const updateChannelMessages = (id, data) => {
  return () => {
    axios
      .put(`/api/channel/${id}`, data)
      .then((res) => {
        socket.emit("new message", res.data);
      })
      .catch((err) => console.log(err));
  };
};
