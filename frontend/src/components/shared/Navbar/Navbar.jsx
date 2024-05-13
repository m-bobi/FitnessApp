import React, { useEffect, useState } from 'react'
import  './Navbar.css';
import { Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";


const Navbar = ({isLoggedIn}) => {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      // Check if the user has scrolled more than 2 pixels
      if (window.scrollY > 2) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
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

      <div className="nav-auth">
      </div>

      <div class="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-10">
      {isLoggedIn ? (
          <Link className="inline-flex rounded-full shadow" to="/signIn">
            <div
              href="#"
              className="inline-flex items-center px-4 py-2 text-base text-gray-900 bg-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50"
            >
              You are logged in
            </div>
          </Link>
          ) : (
            <Link className="inline-flex rounded-full shadow" to="/signIn">
              <div
                href="#"
                className="inline-flex items-center px-4 py-2 text-base text-gray-900 bg-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50"
              >
                Log in
              </div>
            </Link>
          )}
      </div>
    </div>
  );
}

export default Navbar
