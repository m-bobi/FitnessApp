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
    <div className="absolute top-52 left-56">
      <table className="table-auto border border-collapse">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Order Status
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              User Id
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Order Amount
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td className="px-3 py-2 border border-gray-200">
                {order.orderId}
              </td>
              <td className="px-3 py-2 border border-gray-200">
                {order.orderStatus}
              </td>
              <td className="px-3 py-2 border border-gray-200">
                {order.userId}
              </td>
              <td className="px-3 py-2 border border-gray-200">
                {order.orderTotalAmount}
              </td>
              <td className="px-3 py-2 border border-gray-200">
                {order.orderDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOrders;
