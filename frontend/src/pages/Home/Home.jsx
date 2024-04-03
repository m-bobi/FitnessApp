import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import background from '../../assets/shape-17.webp'
import ListOrders from '../../components/OrderCrud/ListOrders';

const Home = () => {
  return (
    <>
      <main
        className="bg-cover h-screen"
        style={{ backgroundImage: `url(${background})` }}
      >
          <Navbar />
          <ListOrders />

      </main>
    </>
  );
}

export default Home
