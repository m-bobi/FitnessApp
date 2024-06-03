import React, { useEffect, useState } from 'react'
import Users from '../../components/shared/DashboardLists/Users'
import Unauthorized from "../../components/Auth/Unauthorized";
import Cookies from "js-cookie";
import api from "../../components/Auth/api";
import WorkoutsList from '../../components/shared/DashboardLists/WorkoutsList';

const WorkoutsDashboard = () => {

  const [isManager, setIsManager] = useState(false);
  const token = Cookies.get("token");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const userId = Cookies.get("id");
      api
        .get(`api/User/getUser/${userId}`)
        .then((response) => {
          if (response.data && response.data.role) {
            if (response.data.role === "Manager") setIsManager(true);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching users data:", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
    return <div>{isManager ? <WorkoutsList /> : <Unauthorized />}</div>;
}

export default WorkoutsDashboard
