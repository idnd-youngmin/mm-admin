import React, { useState } from "react";
import Modyify from "../components/product/modyify";
import PendList from "../components/product/pendList";
// import ProductList from "../components/product/productList";

const Product = () => {
  const [number, setNumber] = useState(0);
  return (
    <div className="wrap">
      <nav className="aside">
        <ul className="aside__ul">
          <li onClick={() => setNumber(0)}>등록 상품</li>
          <li onClick={() => setNumber(1)}>등록 요청대기</li>
          <li onClick={() => setNumber(2)}>수정 요청대기</li>
        </ul>
      </nav>
      <section className="main">
        {/* {number === 0 ? <ProductList /> : null} */}
        {number === 1 ? <PendList /> : null}
        {number === 2 ? <Modyify /> : null}
      </section>
    </div>
  );
};

export default Product;
