import React, { useState, useEffect } from "react";
import { CiTrash } from "react-icons/ci";
import { RiPencilLine } from "react-icons/ri";
import axios from "axios";

const ListUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState({
    userId: "",
    username: "",
    email: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5259/getAllUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching Trainers:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);


  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5259/deleteUser/${userId}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.UserId !== userId)); // Fixed state update
      } catch (error) {
        console.error("Error deleting user:", error);
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

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedUser(user);
  };

  const handleEditField = (field, value) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5259/updateUser/${selectedUser.UserId}`,
        editedUser
      );
      setSelectedUser(null);
      setEditedUser({});
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-40">
      <div className="flex mb-4 space-x-4 text-slate-800">
        <input
          type="text"
          name="userId"
          placeholder="Filter by User ID"
          value={filter.userId}
          onChange={handleFilterChange}
          className="border rounded-lg px-2 py-1"
        />
        <input
          type="text"
          name="username"
          placeholder="Filter by Username"
          value={filter.username}
          onChange={handleFilterChange}
          className="border rounded-lg px-2 py-1"
        />
        <input
          type="text"
          name="password"
          placeholder="Filter by Password"
          value={filter.password}
          onChange={handleFilterChange}
          className="border rounded-lg px-2 py-1"
        />
         <input
          type="text"
          name="email"
          placeholder="Filter by Email"
          value={filter.email}
          onChange={handleFilterChange}
          className="border rounded-lg px-2 py-1"
        />
      </div>
      <table className="table-auto w-full rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="px-3 py-2 font-medium tracking-wider">User ID</th>
            <th className="px-3 py-2 font-medium tracking-wider">Name</th>
            <th className="px-3 py-2 font-medium tracking-wider">Username</th>
            <th className="px-3 py-2 font-medium tracking-wider">Password</th>
            <th className="px-3 py-2 font-medium tracking-wider">Email</th>
            <th className="px-3 py-2 font-medium tracking-wider">Address</th>
            <th className="px-3 py-2 font-medium tracking-wider">Mobile</th>
            <th className="px-3 py-2 font-medium tracking-wider">Age</th>
            <th className="px-3 py-2 font-medium tracking-wider">Member ID</th>
            <th className="px-3 py-2 font-medium tracking-wider">Trainer ID</th>
            <th className="px-3 py-2 font-medium tracking-wider">Created</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user, index) => (
            <tr
              key={user.UserId}
              className={index % 2 === 0 ? "bg-slate-800" : ""}
            >
              <td className="px-3 py-2">{user.userId}</td>
              <td className="px-3 py-2">{user.name}</td>
              <td className="px-3 py-2">{user.username}</td>
              <td className="px-3 py-2">{user.password}</td>
              <td className="px-3 py-2">{user.email}</td>
              <td className="px-3 py-2">{user.address}</td>
              <td className="px-3 py-2">{user.mobile}</td>
              <td className="px-3 py-2">{user.age}</td>
              <td className="px-3 py-2">{user.memberTypeId}</td>
              <td className="px-3 py-2">{user.trainerId}</td>
              <td className="px-3 py-2">{user.createdAt}</td>
              <td className="px-3 py-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEdit(user)}
                >
                  <RiPencilLine />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(user.userId)}
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
      {selectedUser && (
        <div className="absolute bottom-0 right-0 p-4">
          {Object.keys(editedUser).map((field) => (
            <div key={field} className="mb-2">
              <label className="block mb-1 text-sm font-medium ">
                {field}
              </label>
              <input
                type="text"
                value={editedUser[field]}
                onChange={(e) => handleEditField(field, e.target.value)}
                className="border rounded-lg px-2 py-1 w-full text-slate-700"
              />
            </div>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            onClick={handleUpdate}
          >
            Update User
          </button>
        </div>
      )}
    </div>
  );
};

export default ListUsers;
