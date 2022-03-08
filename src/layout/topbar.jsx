import { useMutation } from "react-apollo";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LOGOUT_GQL } from "../apollo/gql/gql";
import { isLoginVar } from "../localStorage/makeVar";
// import { useReactiveVar } from "@apollo/react-hooks";

const Topbar = () => {
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const navigate = useNavigate();
  // let navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  // const isLogin = useReactiveVar(isLoginVar);

  // Logout
  const [logoutMutation, { loading, error }] = useMutation(LOGOUT_GQL, {
    onCompleted(data) {
      if (data) {
        localStorage.removeItem("userToken");
        isLoginVar(false);
        // navigate.navigate("/login");
        window.history.replaceState(null, null, "/login");
      }
    },
  });

  // Logout
  const onLogoutHandler = async (e) => {
    e.preventDefault();
    if (!window.confirm("로그아웃 하시겠습니까?")) return;
    try {
      await logoutMutation({
        variables: {
          refresh_token: userToken?.refresh_token,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <header className="topbar">
      <div className="topbar__wrapper">
        <NavLink to="/">
          <div className="topbar__left">MakersMarket</div>
        </NavLink>
        <div
          className="topbar__right"
          onMouseEnter={() => setToggle(!toggle)}
          onMouseLeave={() => setToggle(!toggle)}
        >
          <img className="topbar__img" src="../img/userImg.png" alt="userImg" />
          {toggle && (
            <>
              <div className="popup">
                <div className="popup__wrap">
                  <ul className="popup__list">
                    <li onClick={onLogoutHandler} className="popup__item">
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;

// const UserPopupWrap = styled.div`
//   position: absolute;
//   top: 100%;
//   right: -10px;
//   padding-top: 20px;
// `;
// const UserPopup = styled.div`
//   position: relative;
//   top: 100%;
//   width: 180px;
//   background-color: #ffffff;
//   z-index: 101;
//   box-shadow: 0px 0px 10px #15181b33;
//   cursor: default;
//   ::after {
//     content: "";
//     position: absolute;
//     top: -12px;
//     right: 23px;
//     width: 0px;
//     height: 0px;
//     border-bottom: 12px solid #ffffff;
//     border-left: 6px solid transparent;
//     border-right: 6px solid transparent;
//   }
// `;
