import { makeVar } from "@apollo/client";

// export const isLoginVar = makeVar(false);

export const isLoginVar = makeVar(Boolean(localStorage.getItem("userToken")));

export const userLogin = (token) => {
  localStorage.setItem("userToken", token);
  isLoginVar(true);
};
