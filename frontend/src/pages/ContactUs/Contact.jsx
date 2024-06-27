import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import ContactUs from '../../components/pages/Contact/ContactUs'
import Unauthorized from "../../components/Auth/Unauthorized";
import Cookies from "js-cookie";
import api from "../../components/Auth/api";

const Contact = () => {
  return (
    <div>
      <Navbar/>
      <ContactUs/>
    </div>
  )
}

export default Contact
