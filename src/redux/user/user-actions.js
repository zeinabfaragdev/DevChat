import axios from "axios";
import md5 from "md5";

axios.defaults.withCredentials = true;

export const addUser = (user) => {
  return {
    type: "ADD_USER",
    payload: user,
  };
};

export const removeUser = () => {
  return {
    type: "REMOVE_USER",
  };
};

export const startLoading = () => {
  return {
    type: "START_LOADING",
  };
};

export const endLoading = () => {
  return {
    type: "END_LOADING",
  };
};

export const addError = (error) => {
  return {
    type: "ADD_ERROR",
    payload: error,
  };
};

export const signIn = (user) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/api/auth/signin", user)
      .then((res) => {
        dispatch(endLoading());
        console.log(res);
      })
      .catch((err) => {
        dispatch(endLoading());
        // dispatch(addError(`${err.response.data}`));
      });
  };
};

export const signUp = (inputs) => {
  return (dispatch) => {
    if (inputs.password !== inputs.passwordConfirmation) {
      dispatch(addError("Passwords do not match"));
    } else {
      dispatch(startLoading());
      const data = {
        username: inputs.username,
        password: inputs.password,
        email: inputs.email,
        avatar: `http://gravatar.com/avatar/${md5(inputs.email)}?d=identicon`,
      };

      axios
        .post("http://localhost:5000/api/auth/signup", data)
        .then((res) => {
          dispatch(endLoading());
          dispatch(addUser(res.data));
        })
        .catch((err) => {
          dispatch(endLoading());
          dispatch(addError(`${err.response.data}`));
        });
    }
  };
};

export const getUser = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/api/auth")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        // dispatch(endLoading());
        // dispatch(addError(`${err.response.data}`));
      });
  };
};

export const signOut = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/api/auth/signout")
      .then((res) => {
        dispatch(removeUser());
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        // dispatch(endLoading());
        // dispatch(addError(`${err.response.data}`));
      });
  };
};
