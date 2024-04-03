import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import banner from '../../assets/banner-2.webp'

const Home = () => {
  return (
    <div>
      <Navbar/>
        <img src={banner}></img>
    </div>
  )
}

export default Home
