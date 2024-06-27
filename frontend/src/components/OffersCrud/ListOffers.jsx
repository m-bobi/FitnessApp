import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../Auth/api";
import { toast, ToastContainer } from "react-toastify";
import AddOffers from "./AddOffers";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import showConfirm from "../../utils/Confirm";
import { useFetch } from "../Context/FetchContext";

const ListOffers = () => {
  const { shouldFetch } = useFetch();

  const exportToPdf = async () => {
    const input = document.getElementById("contacts-table");
    if (!input) {
      console.error("Element not found!");
      return;
    }

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        logging: true,
        scrollX: 0,
        scrollY: 0,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("Offers.pdf");
    } catch (error) {
      console.error("Error generating PDF", error);
    }
  };

  const [allOffers, setAllOffers] = useState([]);

  const token = Cookies.get("token");

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [editedOffer, setEditedOffer] = useState({
    offerId: "",
    offerType: "",
    offerDescription: "",
    offerPrice: "",
  });

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await api.get("api/Offers/getAllOffers");
        setAllOffers(response.data);
      } catch (error) {
        toast.error("Error fetching offers.");
      }
    };

    fetchOffers();
  }, [shouldFetch]);

  const handleDelete = async (id) => {
    const result = await showConfirm(
      "Are you sure you want to delete this offer?"
    );
    if (result) {
      try {
        await api.delete(`api/Offers/deleteOffer/${id}`);
        setAllOffers(allOffers.filter((o) => o.offerId !== id));
        toast.success("Offer deleted successfully");
      } catch (error) {
        toast.error("Error deleting offer.");
      }
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const offerEditing = {
        offerType: editedOffer.offerType,
        offerDescription: editedOffer.offerDescription,
        offerPrice: editedOffer.offerPrice,
      };
      await api.put(
        `api/Offers/updateOffer/${selectedOffer.offerId}`,
        offerEditing
      );
      setAllOffers(
        allOffers.map((offer) =>
          offer.offerId === selectedOffer.offerId
            ? { ...offer, ...offerEditing }
            : offer
        )
      );
      setSelectedOffer(null);
      setEditedOffer({});
      toast.success("Offer updated successfully!");
    } catch (error) {
      toast.error("Error updating offer!");
    }
  };

  const handleEditField = (field, value) => {
    setEditedOffer({ ...editedOffer, [field]: value });
     if (
       ["offerPrice"].includes(field) &&
       value < 0
     ) {
       toast.error("Please enter a valid value.");
       return;
     }
  };

  const handleEdit = (offer) => {
    setSelectedOffer(offer);
    setEditedOffer({
      offerType: offer.offerType,
      offerDescription: offer.offerDescription,
      offerPrice: offer.offerPrice,
    });
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOffers = allOffers.filter((offer) =>
    (offer.offerType?.toLowerCase() ?? "").includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              All Offers
              <AddOffers />
            </h1>
          </div>
          <div className="sm:flex">
            <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
              <form className="lg:pr-3" action="#" method="GET">
                <label for="users-search" className="sr-only">
                  Search
                </label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <input
                    onChange={handleSearchInputChange}
                    type="text"
                    name="email"
                    id="users-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search for offers"
                  />
                </div>
              </form>

            </div>
            <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
              <button
                type="button"
                data-modal-target="add-user-modal"
                data-modal-toggle="add-user-modal"
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="w-5 h-5 mr-2 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add user
              </button>
              <button
                onClick={exportToPdf}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                <svg
                  className="w-5 h-5 mr-2 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table
                id="contacts-table"
                className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600"
              >
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label for="checkbox-all" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {filteredOffers && filteredOffers.length > 0 ? (
                    filteredOffers.map((o) => (
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="w-4 p-4"></td>
                        <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                          {o.offerType}
                        </td>
                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {o.offerDescription}
                        </td>
                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          ${o.offerPrice}
                        </td>
                        <td className="p-4 space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => handleEdit(o)}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                              <path
                                fillRule="evenodd"
                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            Edit Offer
                          </button>
                          <button
                            onClick={() => handleDelete(o.offerId)}
                            data-modal-target="delete-user-modal"
                            data-modal-toggle="delete-user-modal"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            Delete Offer
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No Offers for the moment</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center mb-4 sm:mb-0">
          <a
            href="#"
            className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1-20
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              2290
            </span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <a
            href="#"
            className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <svg
              className="w-5 h-5 mr-1 -ml-1"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            Previous
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Next
            <svg
              className="w-5 h-5 ml-1 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      {selectedOffer && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-6 bg-white rounded-lg shadow-lg max-w-md m-auto w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Update Offer
            </h3>
            <button
              onClick={() => setSelectedOffer(false)}
              type="button"
              className="absolute right-0 top-0 m-4 text-gray-500 hover:text-gray-800"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <form className="space-y-4">
              {Object.keys(editedOffer).map((field) => (
                <div key={field} className="relative">
                  <label htmlFor="" className="text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={["offerPrice"].includes(field) ? "number" : "text"}
                    placeholder={editedOffer[field]}
                    onChange={(e) => handleEditField(field, e.target.value)}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={["offerPrice"].includes(field) ? "0" : undefined}
                    readOnly={field === "id"}
                  />
                </div>
              ))}
              <button
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleUpdate}
              >
                Update Offer
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ListOffers;
