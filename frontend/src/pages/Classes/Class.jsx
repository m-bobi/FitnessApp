import React from "react";
import ClassPage from "../../components/ClassPages/ClassPage";
import Navbar from "../../components/shared/Navbar/Navbar";


const Users = () => {
  return (
    <div className="flex">
      <div className="">
        <Navbar/>
        <ClassPage />
      </div>
    </div>
  );
};

export default Users;
