import axios from "axios";
import md5 from "md5";

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

export const startAuthLoading = () => {
  return {
    type: "START_AUTH_LOADING",
  };
};

export const endUserLoading = () => {
  return {
    type: "END_USER_LOADING",
  };
};

export const addError = (error) => {
  return {
    type: "ADD_ERROR",
    payload: error,
  };
};

export const removeError = () => {
  return {
    type: "REMOVE_ERROR",
  };
};

export const signIn = (user) => {
  return (dispatch) => {
    dispatch(startAuthLoading());
    axios
      .post("/api/auth/signin", user)
      .then((res) => {
        dispatch(addUser(res.data));
      })
      .catch((err) => {
        dispatch(addError(`${err.response.data}`));
      });
  };
};

export const signUp = (inputs) => {
  return (dispatch) => {
    if (inputs.password !== inputs.passwordConfirmation) {
      dispatch(addError("Passwords do not match"));
    } else {
      dispatch(startAuthLoading());
      const data = {
        username: inputs.username,
        password: inputs.password,
        email: inputs.email,
        avatar: `https://gravatar.com/avatar/${md5(inputs.email)}?d=identicon`,
      };

      axios
        .post("/api/auth/signup", data)
        .then((res) => {
          dispatch(addUser(res.data));
        })
        .catch((err) => {
          dispatch(addError(`${err.response.data}`));
        });
    }
  };
};

export const getUser = () => {
  return (dispatch) => {
    axios
      .get("/api/auth")
      .then((res) => {
        dispatch(addUser(res.data));
      })
      .catch(() => {
        dispatch(endUserLoading());
      });
  };
};

export const signOut = () => {
  return (dispatch) => {
    axios
      .get("/api/auth/signout")
      .then(() => {
        dispatch(removeUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
