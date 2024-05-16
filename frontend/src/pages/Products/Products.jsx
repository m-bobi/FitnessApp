import React from "react";
import DashboardNavigation from "../../components/shared/Navbar/AdminDashboard";
import ListProducts from "../../components/ProductCrud/ListProducts";
import AddProduct from "../../components/ProductCrud/AddProducts";

const Products = () => {
  return (
    <div className="flex">
      <DashboardNavigation />
      <div className="flex-1 ml-64 p-8">
        <ListProducts />
        <AddProduct />
      </div>
    </div>
  );
};

export default Products;
