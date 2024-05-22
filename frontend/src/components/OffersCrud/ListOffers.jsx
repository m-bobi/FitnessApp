import React, { useState, useEffect } from "react";
import { CiTrash } from "react-icons/ci";
import { RiPencilLine } from "react-icons/ri";
import axios from "axios";
import config from "../../config";


const ListOffers = () => {

    const [currentPage, setCurrentPage] = useState();

  const [selectedoffer, setSelectedoffer] = useState(null);
  const [editedoffer, setEditedoffer] = useState({});

  const [offers, setOffers] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  
  const [filter, setFilter] = useState({
    offerId: "",
    offerStatus: "",
    userId: "",
  });


  const fetchOffers = async () => {
    try {
      const response = await axios.get(`${config.apiBaseURL}getAllOffers`);
      setOffers(response.data);
    } catch (error) {
      console.error("Error fetching Trainers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [offers]);

  const handleDelete = async (offerId) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      try {
        await axios.delete(`${config.apiBaseURL}deleteoffer/${offerId}`);
        setOffers(offers.filter((offer) => offer.offerId !== offerId));
      } catch (error) {
        console.error("Error deleting offer:", error);
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

  const handleEdit = (offer) => {
    setSelectedoffer(offer);
    setEditedoffer(offer);
  };

  const handleEditField = (field, value) => {
    setEditedoffer({ ...editedoffer, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${config.apiBaseURL}updateoffer/${selectedoffer.offerId}`,
        editedoffer
      );
      setSelectedoffer(null);
      setEditedoffer({});
    } catch (error) {
      console.error("Error updating offer:", error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-40">
      <div className="flex mb-4 space-x-4 text-slate-800">
        <input
          type="text"
          name="offerId"
          placeholder="Filter by offer ID"
          value={filter.offerId}
          onChange={handleFilterChange}
          className="boffer rounded-lg px-2 py-1"
        />
        <input
          type="text"
          name="offerStatus"
          placeholder="Filter by offer Status"
          value={filter.offerStatus}
          onChange={handleFilterChange}
          className="boffer rounded-lg px-2 py-1"
        />
        <input
          type="text"
          name="userId"
          placeholder="Filter by User ID"
          value={filter.userId}
          onChange={handleFilterChange}
          className="boffer rounded-lg px-2 py-1"
        />
      </div>
      <table className="table-auto w-full rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="px-3 py-2 font-medium tracking-wider">Offer ID</th>
            <th className="px-3 py-2 font-medium tracking-wider">
              Offer Type
            </th>
            <th className="px-3 py-2 font-medium tracking-wider">Offer Descriptions</th>
            <th className="px-3 py-2 font-medium tracking-wider">
              Offer End Date
            </th>
            <th className="px-3 py-2 font-medium tracking-wider">Offer Duration Date</th>
            <th className="px-3 py-2 font-medium tracking-wider">Offer Discount</th>
            <th className="px-3 py-2 font-medium tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, index) => (
            <tr
              key={offer.offerId}
              className={index % 2 === 0 ? "bg-slate-800" : ""}
            >
              <td className="px-3 py-2">{offer.offerId}</td>
              <td className="px-3 py-2">{offer.offerType}</td>
              <td className="px-3 py-2">{offer.offerDescription}</td>
              <td className="px-3 py-2">{offer.offerEndDate}</td>
              <td className="px-3 py-2">{offer.offerDurationDate}</td>
              <td className="px-3 py-2">{offer.offerDiscount}</td>

              <td className="px-3 py-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEdit(offer)}
                >
                  <RiPencilLine />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(offer.offerId)}
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
      {selectedoffer && (
        <div className="absolute bottom-0 right-0 p-4">
          {Object.keys(editedoffer).map((field) => (
            <div key={field} className="mb-2">
              <label className="block mb-1 text-sm font-medium ">
                {field}
              </label>
              <input
                type="text"
                value={editedoffer[field]}
                onChange={(e) => handleEditField(field, e.target.value)}
                className="boffer rounded-lg px-2 py-1 w-full text-slate-700"
              />
            </div>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            onClick={handleUpdate}
          >
            Update offer
          </button>
        </div>
      )}
    </div>
  );
};

export default ListOffers;
