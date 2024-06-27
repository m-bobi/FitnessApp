import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Cookies from "js-cookie";
import ListUsers from "../../UsersCrud/ListUsers";
import api from "../../Auth/api";
import { decodeToken } from "../../../utils/Decode";

const Users = () => {
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  const token = Cookies.get("token");

  const [userImage, setUserImage] = useState("");

  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("id");
  };

  useEffect(() => {
    if (token) {
      const { name, role } = decodeToken(token);

      setUserName(name);
      setRole(role);

      const userId = localStorage.getItem("id");

      api
        .get(`api/User/getUser/${userId}`)
        .then((response) => {
          if (response.data && response.data.image) {
            setUserImage(`/img/users/${response.data.image}`);
          }
        })
        .catch((error) => {
          console.error("Error fetching users data:", error);
        });
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white dashboard">
      <div className="fixed w-full flex items-center justify-between h-14 text-white z-10">
        <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-blue-800 dark:bg-gray-800 border-none">
          {userImage && (
            <img
              src={userImage}
              className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden"
              alt="User"
            />
          )}
          <div>
            <span className="hidden md:block text-lg">{userName}</span>
            <span className="hidden md:block text-sm">{role}</span>
          </div>
        </div>
      </div>
      <SideBar />

      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <ListUsers />
      </div>
    </div>
  );
};

export default Users;
