import React from 'react'
import ListOrders from '../../components/OrderCrud/ListOrders';
import AddOrders from '../../components/OrderCrud/AddOrders';
import DashboardNavigation from '../../components/shared/Navbar/DashboardNavigation';


const Orders = () => {

  return (
    <div className="flex">
      <DashboardNavigation />
      <div className="flex-1 ml-64 p-8">
        <ListOrders />
        <AddOrders />
      </div>
    </div>
  );
}

export default Orders
