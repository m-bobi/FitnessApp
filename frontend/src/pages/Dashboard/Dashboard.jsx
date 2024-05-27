import React, { useEffect, useState } from 'react'
import AdminDashboard from '../../components/shared/Navbar/AdminDashboard'
import axios from 'axios';
import Unauthorized from "../../components/Auth/Unauthorized"
import config from '../../config';

const Dashboard = () => {
  const [isManager, setIsManager] = useState(false);
  const token = localStorage.getItem("token")

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const userId = localStorage.getItem("id");
      axios
        .get(`${config.apiBaseURL}api/User/getUser/${userId}`)
        .then((response) => {
          if(response.data && response.data.role){
            if(response.data.role === 'Manager')
            setIsManager(true)
          }
          setIsLoading(false);

        })
        .catch((error) => {
          console.error("Error fetching users data:", error);
          setIsLoading(false);

        });
    }else{
      setIsLoading(false);

    }
  });

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading indicator while loading
  }
  return (
    <div>

     {
       isManager ? (
        <AdminDashboard />
      ) : (
        <Unauthorized/>
      )
     }


    </div>
  );
}

export default Dashboard