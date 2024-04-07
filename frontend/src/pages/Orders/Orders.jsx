import React from 'react'
import ListOrders from '../../components/OrderCrud/ListOrders';
import Navbar from '../../components/shared/Navbar/Navbar';
import background from "../../assets/shape-17.webp";
import AddOrders from '../../components/OrderCrud/AddOrders';


const Orders = () => {

  return (
    <div
      className="bg-cover h-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Navbar />
      <ListOrders />
      <AddOrders/>
    </div>
  );
}

export default Orders
