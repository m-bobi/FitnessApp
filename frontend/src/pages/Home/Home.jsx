import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
// import {Helmet} from "react-helmet"
import TrainersBanner from '../../components/TrainersCrud/TrainersBanner';
import HomeBanner from '../../components/pages/Home/HomeBanner/HomeBanner';
import AboutGym from '../../components/pages/Home/AboutGym/AboutGym';


const Home = () => {
  return (
      <div className="homepage">
    {/* <Helmet>
      <title>Ascend | Home</title>
    </Helmet> */}
        <Navbar/>
        <HomeBanner/>
        <AboutGym/>
      </div>
  );
}

export default Home
