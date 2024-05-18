import React, { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [isManager, setIsManager] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the JWT token from local storage
        const response = await axios.get(`${config.apiBaseURL}api/User/check-role`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setIsManager(response.data.isManager);
      } catch (error) {
        console.error('Error verifying role', error);
        setIsManager(false);
      }
    };

    fetchRole();
  }, []);

  if (isManager === null) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      element={isManager ? <Component /> : <Navigate to="/unauthorized" />}
    />
  );
};

export default ProtectedRoute;
