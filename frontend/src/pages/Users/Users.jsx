import React from "react";
import DashboardNavigation from "../../components/shared/Navbar/AdminDashboard";
import ListUsers from "../../components/UsersCrud/ListUsers";
import AddUser from "../../components/UsersCrud/AddUsers";

const Users = () => {
  return (
    <div className="flex">
      <DashboardNavigation />
      <div className="flex-1 ml-64 p-8">
        <ListUsers />
        <AddUser />
      </div>
    </div>
  );
};

export default Users;