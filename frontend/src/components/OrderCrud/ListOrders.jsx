import React, { useState, useEffect } from "react";
import axios from "axios";

const ListOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5259/getAllOrders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex justify-center pt-40">
      <table className="table-auto rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="px-3 py-2 font-medium tracking-wider">Order ID</th>
            <th className="px-3 py-2 font-medium tracking-wider">
              Order Status
            </th>
            <th className="px-3 py-2 font-medium tracking-wider">User Id</th>
            <th className="px-3 py-2 font-medium tracking-wider">
              Order Amount
            </th>
            <th className="px-3 py-2 font-medium tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.orderId}
              className={index % 2 === 0 ? 'bg-slate-800' : ''}
            >
              <td className="px-3 py-2">{order.orderId}</td>
              <td className="px-3 py-2">{order.orderStatus}</td>
              <td className="px-3 py-2">{order.userId}</td>
              <td className="px-3 py-2">{order.orderTotalAmount}</td>
              <td className="px-3 py-2">{new Date(order.orderDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOrders;
