import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import {Helmet} from "react-helmet"


const Home = () => {
  return (
      <div className="homepage h-[32rem]">
    <Helmet>
      <title>Ascend | Home</title>
    </Helmet>
        <Navbar/>
      </div>
  );
}

export default Home
