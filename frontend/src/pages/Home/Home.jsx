import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import HomeBanner from '../../components/pages/Home/HomeBanner/HomeBanner';
import AboutGym from '../../components/pages/Home/AboutGym/AboutGym';
import OurFeaturedClass from '../../components/pages/Home/OurFeaturedClass/OurFeaturedClass';
import OurOffers from '../../components/pages/Home/OurOffers/OurOffers';
import OurBestTrainers from '../../components/pages/Home/OurBestTrainers/OurBestTrainers';


const Home = () => {
  return (
      <div className="homepage">
        <Navbar/>
        <HomeBanner/>
        <AboutGym/>
        <OurFeaturedClass/>
        <OurOffers/>
        <OurBestTrainers/>
      </div>
  );
}

export default Home
