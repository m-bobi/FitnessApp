import React, { useEffect, useState } from "react";
import api from "../Auth/api";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";

const AddOrders = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    orderTotalAmount: "",
    orderStatus: "",
    userId: "",
    productId: "",
    orderDate: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("api/Users/getAllUsers");
        setUsers(
          response.data.map((user) => ({
            value: user.id,
            label: user.userName,
          }))
        );
      } catch (error) {
        toast.error("Error fetching users: " + error);
      }
    };

    fetchUsers();
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const addOrder = async (event) => {
    event.preventDefault();
    try {
      const { orderTotalAmount, orderStatus, userId, productId, orderDate } =
        formData;
      await api.post(`api/Orders/addOrder`, {
        orderTotalAmount,
        orderStatus,
        userId,
        productId,
        orderDate,
      });
      toast.success("Order added successfully!");
    } catch (error) {
      toast.error("Error adding order.." + error);
    }
  };

  return (
    <div className="relative">
      <ToastContainer
        position="bottom-right"
        padding="5%"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="mt-6 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-900 top-4 right-4 z-50"
        type="button"
        onClick={toggleModal}
      >
        Create Order
      </button>

      {isOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create a new order!
                </h3>
                <button
                  type="button"
                  className=" end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={addOrder} method="POST">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Order Amount
                    </label>
                    <input
                      type="text"
                      name="OrderTotalAmount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter order amount"
                      onChange={(event) => {
                        setFormData((prevState) => ({
                          ...prevState,
                          orderTotalAmount: event.target.value,
                        }));
                      }}
                      required
                    />
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Order Status
                      </label>
                      <input
                        type="text"
                        name="OrderStatus"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter order status"
                        onChange={(event) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            orderStatus: event.target.value,
                          }));
                        }}
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        User
                      </label>
                      <Select
                        options={users}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(selectedOption) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            userId: selectedOption.value,
                          }));
                        }}
                        required
                      />
                    </div>

                    <div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Date
                        </label>
                        <input
                          type="date"
                          name="DateTime"
                          placeholder="Enter date"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                          onChange={(selectedOption) => {
                            setFormData((prevState) => ({
                              ...prevState,
                              orderDate: selectedOption.value,
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="createButton w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOrders;
