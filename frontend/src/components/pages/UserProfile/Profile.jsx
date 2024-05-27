import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import config from "../../../config";
import moment from "moment";
import Cookies from 'js-cookie';
const Profile = () => {
  const [user, setUser] = useState([]);
  const token = Cookies.get('token');
  const userId = Cookies.get('id');

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    gender: "",
    Birthdate: "",
    phoneNumber: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    if (token) {
      axios
        .get(`${config.apiBaseURL}api/User/getUser/${userId}`)
        .then((response) => {
          if (response.data) {
            setUser(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching users data:", error);
        });
    }
  }, [token]);

  const memberSince = () => {
    return moment(user.createdAt).fromNow();
  };

function calculateAge(birthdate) {
  const dob = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userUpdateDto = {
        userName: formData.userName,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        birthdate: formData.birthdate,
        gender: formData.gender,
      };

      const response = await axios.put(
        `${config.apiBaseURL}api/User/updateUser/${userId}`,
        userUpdateDto
      );
      if (response.status === 200) {
        setUser(response.data);
        alert("Profile updated successfully");
        window.location.reload()
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="bg-gray-100 profile">
      <div className="w-full text-white bg-main-color">
        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3 border-t-4 border-blue-400">
                <div className="image overflow-hidden">
                  <div className="text-center my-2">
                    <img
                      className="h-20 w-20 rounded-full mx-auto"
                      src={`/img/users/${user.image}`}
                      alt=""
                    />
                  </div>
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                  {user.name}
                </h1>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="bg-blue-500 py-1 px-2 rounded text-white text-sm">
                        {user.role}
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">{memberSince()}</span>
                  </li>
                </ul>
              </div>

              <div className="my-4"></div>
            </div>

            <div className="w-full md:w-9/12 mx-2 h-64">
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-blue-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Username</div>
                      <div className="px-4 py-2">{user.userName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">{user.gender}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">{user.phoneNumber}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Current Address
                      </div>
                      <div className="px-4 py-2">{user.address}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Permanant Address
                      </div>
                      <div className="px-4 py-2">{user.address}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email</div>
                      <div className="px-4 py-2">
                        <a
                          className="text-blue-800"
                          href="mailto:jane@example.com"
                        >
                          {user.email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Age</div>
                      <div className="px-4 py-2">
                        {calculateAge(user.birthdate)} years old
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-4"></div>

              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="grid grid-cols-1 mx-auto">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-3">
                      <div>
                        <label
                          for="last_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          New Username
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={user.userName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              userName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label
                          for="phone"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          New Phone number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={user.phoneNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phoneNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label
                          for="address"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          New Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={user.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        New Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={user.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="flex items-start mb-6">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <label
                        for="remember"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        I agree with the{" "}
                        <a
                          href="#"
                          className="text-blue-600 hover:underline dark:text-blue-500"
                        >
                          terms and conditions
                        </a>
                        .
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Edit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
