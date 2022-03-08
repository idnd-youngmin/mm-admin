import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

const Layout = () => {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="others">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;

// {
//   /* <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/user" element={<User />} />
//           <Route path="/product" element={<ProductList />} />
//           <Route path="/admin" element={<Admin />} />
//         </Route>
//       </Routes> */
// }
