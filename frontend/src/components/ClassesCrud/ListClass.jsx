import React, { useState, useEffect } from "react";
import { CiTrash } from "react-icons/ci";
import { RiPencilLine } from "react-icons/ri";
import api from "../Auth/api";
import { toast, ToastContainer } from "react-toastify";

const ListClass = () => {
  const [currentPage, setCurrentPage] = useState();

  const [selectedClass, setSelectedClass] = useState(null);
  const [editedClass, setEditedClass] = useState({});

  const [classes, setClasses] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState({
    classId: "",
    classType: "",
    classDescription: "",
  });

  const fetchclasses = async () => {
    try {
      const response = await api.get(`api/Class/getAllClasses`);
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching Trainers:", error);
    }
  };

  useEffect(() => {
    fetchclasses();
  }, []);

  const handleDelete = async (classId) => {
    if (window.confirm("Are you sure you want to delete this Class?")) {
      try {
        await api.delete(`api/Class/deleteClass/${classId}`);
        setClasses(classes.filter((Class) => Class.classId !== classId));
        toast.success("Class deleted successfully!")
      } catch (error) {
        toast.error("Error deleting class!");
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

  const handleEdit = (Class) => {
    setSelectedClass(Class);
    setEditedClass(Class);
  };

  const handleEditField = (field, value) => {
    setEditedClass({ ...editedClass, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`api/Class/updateClass/${selectedClass.classId}`, editedClass);
      setSelectedClass(null);
      setEditedClass({});
      toast.success("Class updated successfully!");
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <ToastContainer/>
      <div className="flex mb-4 space-x-4 text-slate-800">
        <input
          type="text"
          name="classId"
          placeholder="Filter by Class ID"
          value={filter.classId}
          onChange={handleFilterChange}
          className="Class rounded-lg px-2 py-1"
        />
        <input
          type="text"
          name="classType"
          placeholder="Filter by Class Status"
          value={filter.classType}
          onChange={handleFilterChange}
          className="Class rounded-lg px-2 py-1"
        />
        <input
          type="text"
          name="classDescription"
          placeholder="Filter by User ID"
          value={filter.classDescription}
          onChange={handleFilterChange}
          className="Class rounded-lg px-2 py-1"
        />
      </div>
      <table className="table-auto w-full rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="px-3 py-2 font-medium tracking-wider">Class ID</th>
            <th className="px-3 py-2 font-medium tracking-wider">Class Type</th>
            <th className="px-3 py-2 font-medium tracking-wider">
              Class Description
            </th>
            <th className="px-3 py-2 font-medium tracking-wider">
              Class End Date
            </th>
            <th className="px-3 py-2 font-medium tracking-wider">
              Class Duration Date
            </th>
            <th className="px-3 py-2 font-medium tracking-wider">
              Class Discount
            </th>
            <th className="px-3 py-2 font-medium tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((Class, index) => (
            <tr
              key={Class.classId}
              className={index % 2 === 0 ? "bg-slate-800" : ""}
            >
              <td className="px-3 py-2">{Class.classId}</td>
              <td className="px-3 py-2">{Class.classType}</td>
              <td className="px-3 py-2">{Class.classDescription}</td>
              <td className="px-3 py-2">{Class.classImage}</td>

              <td className="px-3 py-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEdit(Class)}
                >
                  <RiPencilLine />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(Class.classId)}
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
      {selectedClass && (
        <div className="absolute bottom-0 right-0 p-4">
          {Object.keys(editedClass).map((field) => (
            <div key={field} className="mb-2">
              <label className="block mb-1 text-sm font-medium ">{field}</label>
              <input
                type="text"
                value={editedClass[field]}
                onChange={(e) => handleEditField(field, e.target.value)}
                className="Class rounded-lg px-2 py-1 w-full text-slate-700"
              />
            </div>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            onClick={handleUpdate}
          >
            Update Class
          </button>
        </div>
      )}
    </div>
  );
};

export default ListClass;
