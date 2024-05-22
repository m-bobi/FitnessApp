import React from 'react'
import Navbar from "../../components/shared/Navbar/Navbar"
import Profile from '../../components/pages/UserProfile/Profile'
import Unauthorized from '../../components/Auth/Unauthorized';

const UserProfile = () => {
  const token = localStorage.getItem("token");
  return (
    <div>
      {
        token ? (
          <div>
             <Navbar/>
           <Profile/>
          </div>
        ) : (
         <Unauthorized/>
        )
      }
      
    </div>
  )
}

export default UserProfile
