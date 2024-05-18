import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoSignOut } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const token = localStorage.getItem("token");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  };

  useEffect(() => {
    if (token) {
      const userId = localStorage.getItem("id");
      axios
        .get(`http://localhost:5259/api/User/getUser/${userId}`)
        .then((response) => {
          if (response.data && response.data.image) {
            setUserImage(response.data.image);
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
        <Link
          to="/dashboard"
          className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg sm:text-sm lg:text-lg xl:text-lg"
        >
          Dashboard
        </Link>
      </div>
      <Link className="search">
        <IoIosSearch className="searchIcon" />
      </Link>

      <div className="nav-auth"></div>

      <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-10 auth">
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
            <div className="inline-flex items-center px-4 py-2 text-base text-gray-900 bg-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50">
              Log In
            </div>
          </Link>
        )}

        {!token && (
          <Link className="inline-flex rounded-full shadow" to="/signup">
            <div className="inline-flex items-center px-4 py-2 text-base text-gray-900 bg-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50">
              Sign Up
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
