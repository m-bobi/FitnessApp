import React from 'react'
import './OurFeaturedClass.css'
import { Link } from 'react-router-dom'

const OurFeaturedClass = () => {
  return (
    <div className='bannerDown'>
        <h1>OUR FEATURED CLASSES</h1>
    <div className='bannerCardsUp'>
                    <Link className='bannerCard card1'>
                        <div className='bannerCardUp'>
                            <div className='ciconBanner'></div>
                            <p className='bannerCtitle'>Cycling</p>
                        </div>
                        <div className='bannerCardDown'>
                            <p className='bcDes'>Feel the freedom and exhilaration of cycling. Boost your endurance, burn calories, and enjoy the ride!</p>
                          
                        </div>
                    </Link>

                    <Link className='bannerCard card2'>
                        <div className='bannerCardUp'>
                            <div className='ciconBanner'></div>
                            <p className='bannerCtitle'>Meditation</p>
                        </div>
                        <div className='bannerCardDown'>
                            <p className='bcDes'>Find your inner peace and clarity. Meditate to reduce stress, improve focus, and enhance overall well-being.</p>
                        </div>
                    </Link>

                    <Link className='bannerCard card3'>
                        <div className='bannerCardUp'>
                            <div className='ciconBanner'></div>
                            <p className='bannerCtitle'>Power Lifting</p>
                        </div>
                        <div className='bannerCardDown'>
                            <p className='bcDes'>Unleash your strength with powerlifting. Build muscle, increase power, and push your limits.</p>
                        </div>
                    </Link>

                    <Link className='bannerCard card4'>
                        <div className='bannerCardUp'>
                            <div className='ciconBanner'></div>
                            <p className='bannerCtitle'>Workout</p>
                        </div>
                        <div className='bannerCardDown'>
                            <p className='bcDes'>Transform your body and mind with regular workouts. Improve fitness, gain energy, and achieve your goals</p>
                        </div>
                    </Link>
    </div>

    
    <div className='bannerDownButton'>
        <Link>
            View All
        </Link>
    </div>
</div>
  )
}

export default OurFeaturedClass
