import React, { useEffect, useState } from 'react'
import  './Navbar.css';
import { Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";


const Navbar = () => {

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
    <div className={scrolled ? 'navbar-scrolled' : 'navbar'}>
        <Link to="/" className='logoHolder'>
            <div className='logo'></div>
        </Link>

        <div className='navLinks text-zinc-900'>
            <Link to="/UserCRUD" className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg sm:text-sm lg:text-lg">User</Link>
            <Link to="/trainers" className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg sm:text-sm lg:text-lg xl:text-lg">Trainers</Link>
            <Link to="/orders" className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg sm:text-sm lg:text-lg xl:text-lg">Orders</Link>
        </div>

        <div className='nav-auth'>
              <Link className='search'>
              <IoIosSearch className='searchIcon' />
              </Link>
        </div>
    </div>
  )
}

export default Navbar
