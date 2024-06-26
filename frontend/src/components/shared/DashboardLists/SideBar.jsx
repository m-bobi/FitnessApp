import { React, useContext } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { RiProductHuntLine } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { BiPackage } from "react-icons/bi";
import { GiGymBag } from "react-icons/gi";
import { IoIosContacts } from "react-icons/io";
import { MdOutlineLocalOffer } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { AuthContext } from "../../Auth/AuthProvider";

const SideBar = () => {
  const token = Cookies.get("token");
  const { logout } = useContext(AuthContext);

  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("id");
    logout();
  };
  return (
    <>
      <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                  Main
                </div>
              </div>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/productdashboard"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <RiProductHuntLine />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Products
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FaUsers />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Users
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/offerdashboard"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <MdOutlineLocalOffer />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Offers
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/ordersdashboard"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <BiPackage />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Orders
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/classesdashboard"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <GiGymBag />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Classes
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/workoutsdashboard"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <CgGym />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Workouts
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/contactdashboard"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <IoIosContacts />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Contacts
                </span>
              </Link>
            </li>

          </ul>
          <p className="mb-14 py-3 hidden md:block text-center text-xs relative flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
            {token && (
              <Link
                className="inline-flex rounded-full shadow"
                to="/signin"
                onClick={handleSignOut}
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <GoSignOut className="dashboardIcon" />
                </span>

                <span className="ml-2 text-sm tracking-wide truncate">
                  Sign Out
                </span>
              </Link>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default SideBar;
