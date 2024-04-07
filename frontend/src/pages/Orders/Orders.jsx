import React from 'react'
import ListOrders from '../../components/OrderCrud/ListOrders';
import AddOrders from '../../components/OrderCrud/AddOrders';
import DashboardNavigation from '../../components/shared/Navbar/DashboardNavigation';


const Orders = () => {

  return (
    <div
      className="bg-cover h-screen"
    >
      <DashboardNavigation />
      <ListOrders />
      <AddOrders/>
    </div>
  );
}

export default Orders
