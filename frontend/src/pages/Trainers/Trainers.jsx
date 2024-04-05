import React from 'react'
import TrainersBanner from '../../components/TrainersCrud/TrainersBanner'
import Navbar from '../../components/shared/Navbar/Navbar'

const Trainers = () => {
  return (
    <div className='trainers-page'>
        <Navbar/>
        <TrainersBanner/>
    </div>
  )
}

export default Trainers
