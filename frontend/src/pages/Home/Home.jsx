import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import HomeBanner from '../../components/pages/Home/HomeBanner/HomeBanner';
import AboutGym from '../../components/pages/Home/AboutGym/AboutGym';
import OurFeaturedClass from '../../components/pages/Home/OurFeaturedClass/OurFeaturedClass';
import OurOffers from '../../components/pages/Home/OurOffers/OurOffers';
import OurBestTrainers from '../../components/pages/Home/OurBestTrainers/OurBestTrainers';
import OurWorkouts from '../../components/pages/Home/OurWorkouts/OurWorkouts';
import Footer from '../../components/shared/Footer/Footer';
import Mbrojtja from '../../components/Test/Mbrojtja';
import Mbrojtja2 from '../../components/Test/Mbrojtja2';


const Home = () => {
  return (
      <div className="homepage">
        <Navbar/>
        <HomeBanner/>
        <AboutGym/>
        <OurFeaturedClass/>
        <OurOffers/>
        <OurBestTrainers/>
        <OurWorkouts/>
        <Footer/>
        {/* <Mbrojtja/> */}
        {/* <Mbrojtja2/> */}
      </div>
  );
}

export default Home
