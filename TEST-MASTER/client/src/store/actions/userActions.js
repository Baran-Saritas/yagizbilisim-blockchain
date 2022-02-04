import {
  POST_DATA_REQUEST,
  POST_DATA_SUCCESS,
  POST_DATA_FAILURE,
} from "../constants";

export const loginUser = (username, password) => async (dispatch) => {

  try {
    dispatch({ type: POST_DATA_REQUEST });

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("tokenKey", result.message);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", username);
      })
      .catch((err) => console.log(err));

    dispatch({ type: POST_DATA_SUCCESS });
  } catch (error) {
    dispatch({ type: POST_DATA_FAILURE });
  }
};

export const registerUser = (username, password) => async (dispatch) => {
  // register

  try {
    dispatch({ type: POST_DATA_REQUEST });

    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("tokenKey", result.message);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", username);
      })
      .catch((err) => console.log(err));

    dispatch({ type: POST_DATA_SUCCESS });
  } catch (error) {
    dispatch({ type: POST_DATA_FAILURE });
  }
};
