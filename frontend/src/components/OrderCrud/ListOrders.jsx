import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiTrash } from "react-icons/ci";
import { RiPencilLine } from "react-icons/ri";
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
          `${config.apiBaseURL}api/Orders/getAllOrders?page=${currentPage}&limit=${ordersPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setOrders(response.data.orders);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [currentPage]);

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(
          `${config.apiBaseURL}api/Orders/deleteOrder/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
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
        `${config.apiBaseURL}api/Orders/updateOrder/${selectedOrder.orderId}`,
        editedOrder,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSelectedOrder(null);
      setEditedOrder({});
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="mt-4 mx-4">
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

      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {orders.map((order, index) => (
                <tr
                  key={order.orderId}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : ""
                  } hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://via.placeholder.com/150"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">{order.userId}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {order.userRole}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    ${order.orderTotalAmount}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span
                      className={`px-2 py-1 font-semibold leading-tight rounded-full ${
                        order.orderStatus === "Approved"
                          ? "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100"
                          : order.orderStatus === "Pending"
                          ? "text-yellow-700 bg-yellow-100"
                          : order.orderStatus === "Denied"
                          ? "text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-700"
                          : "text-gray-700 bg-gray-100 dark:text-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-xs">
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
        </div>
        <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
          <span className="flex items-center col-span-3">
            Showing {currentPage * ordersPerPage - ordersPerPage + 1}-
            {Math.min(currentPage * ordersPerPage, orders.length)} of{" "}
            {orders.length}
          </span>
          <span className="col-span-2"></span>
          <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
              <ul className="inline-flex items-center">
                <li>
                  <button
                    className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Previous"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 01-1.414 1.414l-4-4a1 1 010-1.414l4-4a1 1 011.414 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <li key={page}>
                      <button
                        className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  )
                )}
                <li>
                  <button
                    className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Next"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7.293 14.707a1 1 010-1.414L10.586 10 7.293 6.707a1 1 011.414-1.414l4 4a1 1 010 1.414l-4 4a1 1 01-1.414 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </span>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed bottom-0 right-0 p-4 bg-white shadow-md rounded-lg">
          {Object.keys(editedOrder).map((field) => (
            <div key={field} className="mb-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                {field}
              </label>
              <input
                type="text"
                value={editedOrder[field]}
                onChange={(e) => handleEditField(field, e.target.value)}
                className="border rounded-lg px-2 py-1 w-full text-gray-700"
              />
            </div>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
