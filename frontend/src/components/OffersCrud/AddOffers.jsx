import React, { useState } from "react";
import axios from "axios";
import config from "../../config";


const AddOffers = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [offerType, setOfferType] = useState("");
  const [offerDescription, setOfferDescription] = useState("");
  const [offerEndDate, setOfferEndDate] = useState("");
  const [offerDurationDate, setOfferDurationDate] = useState("");
  const [offerDiscount, setOfferDiscount] = useState(0);

  const addOffer = (event) => {
    event.preventDefault();
    try {
      axios
        .post(`${config.apiBaseURL}addOffer`, {
            offerType: offerType,
            offerDescription: offerDescription,
            offerEndDate: offerEndDate,
            offerDurationDate: offerDurationDate,
            offerDiscount : offerDiscount
        })
        .then(() => {
          console.log("success");
          window.alert("Order has been added.");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative">
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="mt-6 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-900 fixed top-4 right-4 z-50"
        type="button"
        onClick={toggleModal}
      >
        Create Offer
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
                  Create a new offer!
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
                <form className="space-y-4" onSubmit={addOffer} method="POST">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Offer Type
                    </label>
                    <input
                      type="text"
                      name="OrderTotalAmount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter offer type"
                      onChange={(event) => {
                        setOfferType(event.target.value);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Offer description
                    </label>
                    <input
                      type="text"
                      name="OrderStatus"
                      placeholder="Enter offer  description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={(event) => {
                        setOfferDescription(event.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Offer End Date
                    </label>
                    <input
                      type="date"
                      name="UserID"
                      placeholder="Enter offer end date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={(event) => {
                        setOfferEndDate(event.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Offer Duration Date
                      </label>
                      <input
                        type="date"
                        name="DateTime"
                        placeholder="Enter Offer Duration Date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                        onChange={(event) => {
                            setOfferDurationDate(event.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Offer Discount
                      </label>
                      <input
                        type="text"
                        name="DateTime"
                        placeholder="Enter offer Discount"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                        onChange={(event) => {
                            setOfferDiscount(event.target.value);
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
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOffers;