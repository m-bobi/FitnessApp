import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { IoIosSearch, IoMdMenu } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { GoSignOut } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../Auth/api";
import { AuthContext } from "../../Auth/AuthProvider";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const token = Cookies.get("token");

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("id");
    Cookies.remove("refreshToken");
    logout();
    localStorage.removeItem("cart");
    window.location.reload();
    navigate("/signin");
  };

  useEffect(() => {
    if (token) {
      const userId = Cookies.get("id");
      api
        .get(`api/User/getUser/${userId}`)
        .then((response) => {
          if (response.data?.image) {
            setUserImage(response.data.image);
          }
          if (response.data?.role === "Manager") setIsManager(true);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [token]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 2);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const savedProducts = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(savedProducts.length);
    };
    updateCartCount();
    const intervalId = setInterval(updateCartCount, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`container mx-auto px-4 py-4 flex items-center justify-between shadow-md ${scrolled ? 'shadow-sm' : ''}`}>
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-black rounded-full"></div>
        <span className="font-bold text-lg">Ascend</span>
      </Link>
      <div className="hidden md:flex space-x-6">
        <Link to="/classes" className="text-gray-600 hover:text-gray-900">Classes</Link>
        <Link to="/products" className="text-gray-600 hover:text-gray-900">Products</Link>
        <Link to="/aboutus" className="text-gray-600 hover:text-gray-900">About Us</Link>
        <Link to="/contactus" className="text-gray-600 hover:text-gray-900">Contact Us</Link>
        {isManager && <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>}
      </div>
      <div className="hidden md:flex items-center space-x-4">
        {token && (
          <Link to="/cart" className="relative">
            <LuShoppingCart className="text-2xl" />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
          </Link>
        )}
        <button onClick={toggleSearchBar} className="text-xl">
          <IoIosSearch />
        </button>
        {showSearchBar && <input type="text" className="border rounded px-2 py-1" placeholder="Search..." />}
        {token ? (
          <div className="relative">
            <div onClick={() => setIsDropdownVisible(!isDropdownVisible)} className="cursor-pointer">
              {userImage ? (
                <img src={`/img/users/${userImage}`} alt="User" className="w-8 h-8 rounded-full" />
              ) : (
                <FaRegUserCircle className="text-3xl" />
              )}
            </div>
            {isDropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                <Link to="/userprofile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                  <GoSignOut className="inline mr-1" /> Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signin" className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">Log in</Link>
            <Link to="/signup" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">Sign Up</Link>
          </>
        )}
      </div>
      <button onClick={toggleSidebar} className="md:hidden">
        <IoMdMenu className="text-2xl" />
      </button>
    </div>
  );
};

export default Navbar;

