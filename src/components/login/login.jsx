import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { useNavigate } from "react-router-dom";
import { LOGIN_GQL } from "../../apollo/gql/gql";
import { isLoginVar } from "../../localStorage/makeVar";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const [loginMutation, { loading, error }] = useMutation(LOGIN_GQL, {
    onCompleted(data) {
      if (data) {
        localStorage.setItem("userToken", JSON.stringify(data.sign_in));
        const current = isLoginVar();
        isLoginVar(!current);
        navigate("/");
      }
    },
    onError(data) {
      if (!data) return navigate("/login");
      else return setInputValue({ email: "", password: "" });
    },
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const onSubmitHandler = async (e) => {
    const value = inputValue;
    e.preventDefault();
    try {
      await loginMutation({ variables: value });
    } catch (e) {
      // await navigate("/login");
      await setInputValue({ email: "", password: "" });
    }
  };

  if (loading) return "Loading...";
  // if (error) {
  //   return console.log(error, "errorerror");
  // }

  return (
    <div className="loginWrap">
      <form className="login" onSubmit={onSubmitHandler}>
        <div className="login__wrapper">
          <h1 className="login__logo">
            <img src="../img/login.png" alt="Logo" />
          </h1>
          <div className="login__inputWrap">
            <div className="login__id">
              <h3 className="login__title">E-mail</h3>
              <input
                className="login__input"
                type="email"
                placeholder="Email"
                name="email"
                value={inputValue.email}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="login__password">
              <h3 className="login__title">Password</h3>
              <input
                className="login__input"
                type="password"
                value={inputValue.password}
                placeholder="Password"
                name="password"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
          </div>
          <div className="login__button">
            <button>Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
