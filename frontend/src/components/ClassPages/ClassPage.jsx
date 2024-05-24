import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";

const ClassPage = () => {
  const { id } = useParams();
  const [classItem, setClassItem] = useState(null);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseURL}api/Class/getClass/${id}`
        );
        setClassItem(response.data);
      } catch (error) {
        console.error("Error fetching class:", error);
      }
    };

    fetchClass();
  }, [id]);

  const enrollUserInClass = async () => {
    const userId = localStorage.getItem("id"); 

    try {
      await axios.post(
        `${config.apiBaseURL}api/Class/enrollUserInClass/${userId}/${id}`
      );
      alert("Successfully enrolled in class");
    } catch (error) {
      alert("Error enrolling in class: " + error.message);
    }
  };

  if (!classItem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center align-middle p-40">
      <img src={`/img/classes/${classItem.classImage}`} alt="" />
      <h1 className="text-2xl">{classItem.classType}</h1>
      <p>{classItem.classDescription}</p>
      <button onClick={enrollUserInClass}>Enroll in this class</button>
    </div>
  );
};

export default ClassPage;
