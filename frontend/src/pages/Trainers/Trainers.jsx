import React from 'react'
import TrainersBanner from '../../components/TrainersCrud/TrainersBanner'
import Navbar from '../../components/shared/Navbar/Navbar'
import TrainersSection from '../../components/TrainersCrud/TrainersSection'

const Trainers = () => {
  return (
    <div className='trainers-page'>
        <Navbar/>
        <TrainersBanner/>
        <TrainersSection/>
    </div>
  )
}

export default Trainers
