import React from 'react'
import './HomeBanner.css';
const HomeBanner = () => {
  return (
    <div className="homeBanner">
      <div className="homeBannerContainer" data-aos="fade-right">
        <p className="firstText">FIND YOUR ENERGY</p>
        <div className="middleText">
          <p>GROW MENTALLY, AND PHYSICALLY</p>
        </div>
        <div className="bottomText">
          <p>Need help getting started?</p>
        </div>
        <button
          type="submit"
          className="buttonS mt-5 tracking-wide font-semibold text-gray-100 hover:text-gray-900 w-52 py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          <span className="ml-3">Start now!</span>
        </button>
      </div>
    </div>
  );
}

export default HomeBanner
