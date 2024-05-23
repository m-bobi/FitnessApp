import React, { useEffect, useState } from "react";
import "./OurFeaturedClass.css";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../../config";

const OurFeaturedClass = () => {
  const [classes, setClasses] = useState([]);

  const fetchclasses = async () => {
    try {
      const response = await axios.get(
        `${config.apiBaseURL}api/Class/getAllClasses`
      );
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching Trainers:", error);
    }
  };

  useEffect(() => {
    fetchclasses();
  }, []);

  return (
    <div className="bannerDown">
      <h1>OUR FEATURED CLASSES</h1>
      <div className="bannerCardsUp">
        {classes.map((classItem, index) => (
          <Link
            key={index}
            to={`/class/${classItem.classId}`}
            className="bannerCard"
            data-aos="fade-right"
          >
            <div className="bannerCardUp">
              <div className="ciconBanner">
                <p className="bannerCtitle">{classItem.classType}</p>
                <img src={`/img/classes/${classItem.classImage}`} alt="" />
              </div>
            </div>
            <div className="bannerCardDown">
              <p className="bcDes">{classItem.classDescription}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="bannerDownButton hover:bg-white">
        <Link>View All</Link>
      </div>
    </div>
  );
};

export default OurFeaturedClass;
