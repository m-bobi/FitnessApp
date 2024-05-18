import React, { useEffect, useState } from 'react'
import AdminDashboard from '../../components/shared/Navbar/AdminDashboard'

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    if (role === 'Manager') {
        setIsManager(true);
    } else {
        setIsManager(false);
    }
}, [role]);
  return (
    <div>
      {
        isManager ? (
      <AdminDashboard />  
        ) : (
          <div>You are not allowed here!!!</div>
        )
      }
      
    </div>
  );
}

export default Dashboard