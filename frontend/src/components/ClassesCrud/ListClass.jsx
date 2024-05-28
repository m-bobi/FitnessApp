import React, { useState, useEffect } from "react";
import { CiTrash } from "react-icons/ci";
import { RiPencilLine } from "react-icons/ri";
import axios from "axios";
import config from "../../config";


const ListClass = () => {

    const [currentPage, setCurrentPage] = useState();

  const [selectedklasa, setSelectedklasa] = useState(null);
  const [editedklasa, setEditedklasa] = useState({});

  const [classes, setClasses] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState({
    classId: "",
    classType: "",
    classDescription: "",
  });


  const fetchclasses = async () => {
    try {
      const response = await axios.get(`${config.apiBaseURL}api/Class/getAllClasses`);
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching Trainers:", error);
    }
  };

  useEffect(() => {
    fetchclasses();
  }, []);

  const handleDelete = async (classId) => {
    if (window.confirm("Are you sure you want to delete this klasa?")) {
      try {
        await axios.delete(`${config.apiBaseURL}deleteklasa/${classId}`);
        setClasses(classes.filter((klasa) => klasa.classId !== classId));
      } catch (error) {
        console.error("Error deleting klasa:", error);
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

  const handleEdit = (klasa) => {
    setSelectedklasa(klasa);
    setEditedklasa(klasa);
  };

  const handleEditField = (field, value) => {
    setEditedklasa({ ...editedklasa, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${config.apiBaseURL}updateklasa/${selectedklasa.classId}`,
        editedklasa
      );
      setSelectedklasa(null);
      setEditedklasa({});
    } catch (error) {
      console.error("Error updating klasa:", error);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="flex mb-4 space-x-4 text-slate-800">
        <input
          type="text"
          name="classId"
          placeholder="Filter by klasa ID"
          value={filter.classId}
          onChange={handleFilterChange}
          className="bklasa rounded-lg px-2 py-1"
        />
        <input
          type="text"
          name="classType"
          placeholder="Filter by klasa Status"
          value={filter.classType}
          onChange={handleFilterChange}
          className="bklasa rounded-lg px-2 py-1"
        />
        <input
          type="text"
          name="classDescription"
          placeholder="Filter by User ID"
          value={filter.classDescription}
          onChange={handleFilterChange}
          className="bklasa rounded-lg px-2 py-1"
        />
      </div>
      <table className="table-auto w-full rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="px-3 py-2 font-medium tracking-wider">klasa ID</th>
            <th className="px-3 py-2 font-medium tracking-wider">
              klasa Type
            </th>
            <th className="px-3 py-2 font-medium tracking-wider">klasa Descriptions</th>
            <th className="px-3 py-2 font-medium tracking-wider">
              klasa End Date
            </th>
            <th className="px-3 py-2 font-medium tracking-wider">klasa Duration Date</th>
            <th className="px-3 py-2 font-medium tracking-wider">klasa Discount</th>
            <th className="px-3 py-2 font-medium tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((klasa, index) => (
            <tr
              key={klasa.classId}
              className={index % 2 === 0 ? "bg-slate-800" : ""}
            >
              <td className="px-3 py-2">{klasa.classId}</td>
              <td className="px-3 py-2">{klasa.classType}</td>
              <td className="px-3 py-2">{klasa.classDescription}</td>
              <td className="px-3 py-2">{klasa.classImage}</td>
           

              <td className="px-3 py-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEdit(klasa)}
                >
                  <RiPencilLine />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(klasa.classId)}
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
      {selectedklasa && (
        <div className="absolute bottom-0 right-0 p-4">
          {Object.keys(editedklasa).map((field) => (
            <div key={field} className="mb-2">
              <label className="block mb-1 text-sm font-medium ">
                {field}
              </label>
              <input
                type="text"
                value={editedklasa[field]}
                onChange={(e) => handleEditField(field, e.target.value)}
                className="bklasa rounded-lg px-2 py-1 w-full text-slate-700"
              />
            </div>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            onClick={handleUpdate}
          >
            Update klasa
          </button>
        </div>
      )}
    </div>
  );
};

export default ListClass;

