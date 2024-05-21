import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoSignOut } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import config from "../../../config";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const [scrolled, setScrolled] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isManager, setIsManager] = useState(false);

  const token = localStorage.getItem("token");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    window.location.reload();
  };

  useEffect(() => {
    if (token) {
      const userId = localStorage.getItem("id");
      axios
        .get(`${config.apiBaseURL}api/User/getUser/${userId}`)
        .then((response) => {
          if (response.data && response.data.image) {
            setUserImage(response.data.image);
          }
          if(response.data && response.data.role){
            if(response.data.role === 'Manager')
            setIsManager(true)
          }
        })
        .catch((error) => {
          console.error("Error fetching users data:", error);
        });
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={scrolled ? "navbar-scrolled" : "navbar"}>
      <Link to="/" className="logoHolder">
        <div className="logo"></div>
      </Link>
      <div className="navLinks ">
        <Link
          to="/UserCRUD"
          className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg sm:text-sm lg:text-lg"
        >
          User
        </Link>
        <Link
          to="/trainers"
          className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg sm:text-sm lg:text-lg xl:text-lg"
        >
          Trainers
        </Link>
        <Link
          to="/orders"
          className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg sm:text-sm lg:text-lg xl:text-lg"
        >
          Orders
        </Link>
        <Link
          to="/products"
          className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg sm:text-sm lg:text-lg xl:text-lg"
        >
          Products
        </Link>
        {isManager && (
          <Link
            to="/dashboard"
            className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg sm:text-sm lg:text-lg xl:text-lg"
          >
            Dashboard
          </Link>
        )}
        {/* <Link
          to="/dashboard"
          className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg sm:text-sm lg:text-lg xl:text-lg"
        >
          Dashboard
        </Link> */}
      </div>
  
    

    

      <div className="nav-auth"></div>

      <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-10 auth">
      <div className="searchbar-icon">
      <Link className="search invert" onClick={toggleSearchBar}>
        <IoIosSearch className="searchIcon" />
      </Link>
      {showSearchBar && (
        <input
          type="text"
          className="searchBar"
          placeholder="Search..."
        />
      )}
      </div>
        {token && userImage && (
          <div
            className="relative inline-flex items-center justify-center rounded-full shadow overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsDropdownVisible(true)}
          >
            <img
              src={`/img/users/${userImage}`}
              alt="User"
              className="w-16 h-16 object-cover"
            />
          </div>
        )}
        {token && !userImage && (
          <div
            className="relative invert text-3xl inline-flex items-center justify-center rounded-full shadow overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsDropdownVisible(true)}
          >
            <FaRegUserCircle/>
          </div>
        )}
        <div>
          {isDropdownVisible && (
            <div className="absolute right-0 mt-3 w-40 bg-white rounded-md shadow-lg py-1 dropdown-menu">
              <Link
                to="#"
                className="block px-4 py-2 text-sm text-red-500 "
                onClick={handleSignOut}
                onMouseLeave={() => setIsDropdownVisible(false)}
              >
                <GoSignOut /> Log Out
              </Link>
            </div>
          )}
        </div>
        {!token && (
          <Link className="inline-flex rounded-full shadow" to="/signin">
           <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Log in</button>
          </Link>
        )}

        {!token && (
          <Link className="inline-flex rounded-full shadow" to="/signup">
            <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Sign Up</button>
          </Link>
        )}
      </div>
     <Link>
     <IoMdMenu className="hamburgerMenu" />
     </Link>
    </div>
  );
};

export default Navbar;
