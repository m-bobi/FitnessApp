import React, { useState, useEffect } from "react";
import { CiTrash } from "react-icons/ci";
import { RiPencilLine } from "react-icons/ri";
import axios from "axios";
import config from "../../config";


const ListOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editedOrder, setEditedOrder] = useState({});

  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState({
    orderId: "",
    orderStatus: "",
    userId: "",
  });

  const ordersPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseURL}getAllOrders?page=${currentPage}&limit=${ordersPerPage}`
        );

        setOrders(response.data.orders);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [orders]);

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`${config.apiBaseURL}deleteOrder/${orderId}`);
        setOrders(orders.filter((order) => order.orderId !== orderId));
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setEditedOrder(order);
  };

  const handleEditField = (field, value) => {
    setEditedOrder({ ...editedOrder, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${config.apiBaseURL}updateOrder/${selectedOrder.orderId}`,
        editedOrder
      );
      setSelectedOrder(null);
      setEditedOrder({});
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-40">
      <div className="flex mb-4 space-x-4 text-slate-800">
        <input
          type="text"
          name="orderId"
          placeholder="Filter by Order ID"
          value={filter.orderId}
          onChange={handleFilterChange}
          className="border rounded-lg px-2 py-1"
        />
        <input
          type="text"
          name="orderStatus"
          placeholder="Filter by Order Status"
          value={filter.orderStatus}
          onChange={handleFilterChange}
          className="border rounded-lg px-2 py-1"
        />
        <input
          type="text"
          name="userId"
          placeholder="Filter by User ID"
          value={filter.userId}
          onChange={handleFilterChange}
          className="border rounded-lg px-2 py-1"
        />
      </div>
      <table className="table-auto w-full rounded-lg shadow-md">
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
            <th className="px-3 py-2 font-medium tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.orderId}
              className={index % 2 === 0 ? "bg-slate-800" : ""}
            >
              <td className="px-3 py-2">{order.orderId}</td>
              <td className="px-3 py-2">{order.orderStatus}</td>
              <td className="px-3 py-2">{order.userId}</td>
              <td className="px-3 py-2">{order.orderTotalAmount}</td>
              <td className="px-3 py-2">
                {new Date(order.orderDate).toLocaleDateString()}
              </td>

              <td className="px-3 py-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEdit(order)}
                >
                  <RiPencilLine />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(order.orderId)}
                >
                  <CiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`mx-1 px-3 py-1 rounded-lg ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-slate-600"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      {selectedOrder && (
        <div className="absolute bottom-0 right-0 p-4">
          {Object.keys(editedOrder).map((field) => (
            <div key={field} className="mb-2">
              <label className="block mb-1 text-sm font-medium ">
                {field}
              </label>
              <input
                type="text"
                value={editedOrder[field]}
                onChange={(e) => handleEditField(field, e.target.value)}
                className="border rounded-lg px-2 py-1 w-full text-slate-700"
              />
            </div>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            onClick={handleUpdate}
          >
            Update Order
          </button>
        </div>
      )}
    </div>
  );
};

export default ListOrders;
