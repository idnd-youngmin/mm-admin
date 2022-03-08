import "./App.css";
import { Route, Routes } from "react-router-dom";
// import Admin from "./pages/admin";
// import PendList from "./components/product/pendList";
// import User from "./pages/user";
// import Layout from "./layout/layout";
// import Home from "./pages/home";
// import Topbar from "./layout/topbar";
// import Sidebar from "./layout/sidebar";
import Products from "./components/products";
import Login from "./components/login/login";
import Layout from "./layout/layout";
import { isLoginVar } from "./localStorage/makeVar";
import { useReactiveVar } from "@apollo/react-hooks";
import UserList from "./components/user/userList";
import Admin from "./components/admin/admin";
import SaleList from "./components/admin/saleList";
import PrivateRoute from "./privateRoute";
// import Nav from "./layout/nav";
// import Home from "./pages/home";

function App() {
  // const isLoggedIn = useReactiveVar(isLoginVar);
  // const user = JSON.parse(localStorage.getItem("userToken"));

  // const user = localStorage.getItem("userToken")
  //   ? JSON.parse(localStorage.getItem("userToken"))
  //   : false;
  // console.log(user, "확이중@@!!");
  const isLogged = useReactiveVar(isLoginVar);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute isLogged={isLogged} />}>
          <Route path="/" element={<Layout />}>
            <Route path="/Product" element={<Products />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/saleList" element={<SaleList />} />
          </Route>
        </Route>
      </Routes>
    </>
    // <>
    //   <Topbar />
    //   <div className="container">
    //     <Sidebar />
    //     <section className="others">
    //       <Routes>
    //         {/* <Route path="/" element={<Products />} /> */}
    //         <Route path="/product" element={<Products />} />
    //         {/* <Route path="/product" element={<Login />} /> */}
    //       </Routes>
    //     </section>
    //   </div>
    // </>
  );
}

export default App;
