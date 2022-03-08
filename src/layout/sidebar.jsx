import {
  Business,
  LineStyle,
  List,
  Person,
  SupervisorAccount,
} from "@material-ui/icons";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const activeStyle = {
    background: "rgb(228, 228, 250)",
    display: "block",
    borderRadius: "10px",
  };
  return (
    <aside className="siderBar">
      <div className="siderBar__wrapper">
        <div className="siderBar__menu">
          <h3 className="siderBar__title">대시보드</h3>
          <ul className="siderBar__list">
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <li className="siderBar__item ">
                <LineStyle className="siderBar__icon" />
                Home
              </li>
            </NavLink>
          </ul>
        </div>
        {/* 상품 */}
        <div className="siderBar__menu">
          <h3 className="siderBar__title">유저</h3>
          <ul className="siderBar__list">
            <NavLink
              to="/user"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <li className="siderBar__item">
                <Person className="siderBar__icon" />
                {/* <Business /> */}
                {/* <PersonIcon className="siderBar__icon" /> */}
                크리에이터 승인
              </li>
            </NavLink>
          </ul>
        </div>
        {/* 상품 */}
        <div className="siderBar__menu">
          <h3 className="siderBar__title">상품</h3>
          <ul className="siderBar__list">
            <NavLink
              to="/product"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <li className="siderBar__item">
                <Business className="siderBar__icon" />
                판매승인
              </li>
            </NavLink>
          </ul>
        </div>
        {/* 관리자 */}
        <div className="siderBar__menu">
          <h3 className="siderBar__title">관리자</h3>
          <ul className="siderBar__list">
            <NavLink
              to="/admin"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <li className="siderBar__item">
                <SupervisorAccount className="siderBar__icon" />
                관리자
              </li>
            </NavLink>
            <NavLink
              to="/saleList"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <li className="siderBar__item">
                <List className="siderBar__icon" />
                판매내역
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
