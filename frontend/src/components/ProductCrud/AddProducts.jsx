import React, { useState } from "react";
import axios from "axios";
import config from '../../config'
import { ToastContainer, toast } from "react-toastify";

const AddProducts = () => {


  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "",
    productStock: "",
    productRate : 0,
    productImage: null,
  });

  function handleSubmit() {
    const {
      productName,
      productDescription,
      productPrice,
      productCategory,
      productStock,
      productRate,
      productImage,
    } = formData;




    const allowedExtensions = ["png", "jpg", "jpeg", "webp"];
    const fileExtension = productImage.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      toast.error(
        "Only .png, .jpg, .jpeg, and .webp file formats are allowed."
      );
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("image", productImage);

    axios
      .post(`${config.apiBaseURL}api/UploadImages/addProductImage`, formDataObj)
      .then((imageResponse) => {
        return axios.post(`${config.apiBaseURL}api/Products/addProduct`, {
          ...formData,
          productImage: imageResponse.data,
        });
      })
      .then(() => {
        toast.success("You've successfully added a product!");

      })
      .catch((error) => {
        console.error(error);
        toast.error(
          "An error occurred while adding. Please try again later."
        );
      });
  }


  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div className="relative">

      {/* Modal Trigger Button */}
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
        className="mt-6 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-900  z-50"
        type="button"
        onClick={toggleModal}
      >
        Create Product
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
                  Create a new Product!
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
                <form className="space-y-4" >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="productName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter Product name"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Product Description
                    </label>
                    <input
                      type="text"
                      name="productDescription"
                      placeholder="Enter Product status"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Product Price
                    </label>
                    <input
                      type="number"
                      name="productPrice"
                      placeholder="Enter product price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Product Category
                    </label>
                    <input
                      type="text"
                      name="productCategory"
                      placeholder="Enter product category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Product Stock
                    </label>
                    <input
                      type="number"
                      name="productStock"
                      placeholder="Enter product stock"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Product Rate
                    </label>
                    <input
                      type="number"
                      name="productRate"
                      placeholder="Enter product rate from 1 to 5"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Product Image
                    </label>
                    <input
                      type="file"
                      name="productImage"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      onChange={handleChange}
                    />
                  </div>

                  <button

                   onClick={handleSubmit}
                    className="createButton w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add Product
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProducts;
