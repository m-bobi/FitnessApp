import React, { useEffect, useState } from "react";
import "./AllClasses.css";
import { Link } from "react-router-dom";
import api from "../../Auth/api";
import { ToastContainer, toast } from "react-toastify";

const Classes = () => {
  const [classes, setClasses] = useState([]);

  const fetchclasses = async () => {
    try {
      const response = await api.get(`api/Class/getAllClasses`);
      setClasses(response.data);
    } catch (error) {
      toast.error("Error fetching classes! Please, contact a staff member!");
    }
  };

  useEffect(() => {
    fetchclasses();
  }, []);

return (
  <div className="allClasses">
    <ToastContainer
      position="bottom-right"
      padding="5%"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <div className="classesBanner">
      <div className="homeBannerContainer" data-aos="fade-right">
        <p className="firstText">Ascend - Classes</p>
      </div>
    </div>

    <div className="bannerCardsUp">
      {classes.length > 0 ? (
        classes.map((classItem, index) => (
          <Link
            key={index}
            to={`/className/${classItem.classId}`}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            data-aos="fade-right"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={`/img/classes/${classItem.classImage}`}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {classItem.classType}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {classItem.classDescription}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500">No classes available yet.</p>
      )}
    </div>
  </div>
);
}
export default Classes;
