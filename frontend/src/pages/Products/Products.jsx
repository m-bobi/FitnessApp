import React from "react";
import Navbar from '../../components/shared/Navbar/Navbar'
import Products from "../../components/pages/Products/Products"

const Product = () => {
  return (
    <div className="homepage">
      <Navbar/>
        <Products />
      </div>
  );
};

export default Product;
