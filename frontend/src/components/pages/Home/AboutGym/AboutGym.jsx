import React, { useState } from 'react'
import './AboutGym.css'
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import { FaCirclePlus } from "react-icons/fa6";

const AboutGym = () => {
    const [counterOn,setCounterOn] = useState(false);
  return (
    <div className='aboutGym'>
        <div className='aboutGym-leftSide'>
            <div className='redBadge'></div>
            <div className='aboutGym-leftSide-img'></div>

        </div>

        <div className='aboutGym-rightSide' data-aos="fade-left">
             <p className='firstText'>ABOUT ASCEND</p>
             <div className='aboutRightHeading-holder'>
                <p>Get your dream body shape with us!</p>
             </div>

             <div className='about-middle-text'>
             <p>   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem totam odio nisi facilis quaerat voluptatibus reprehenderit, pariatur consectetur sit omnis!</p>
             </div>

             <ScrollTrigger onEnter={() => setCounterOn(true) } onExit={() => setCounterOn(false)} className='numbers-rising'>
                 <div className='number-rising'>
                <div className='numbers-rising-left'>
                    <div className='weightlifter-icon'></div>
                    <div className='number'>
                  <p className='countNum'>
                        {
                            counterOn && (
                                <CountUp start={0} end={1500} duration={2} delay={0}/>
                            )
                        }

                    </p>
                    <FaCirclePlus className='plusIcon'/>
                  </div>
                  <h2 className='textIcon'>TRAINED PEOPLE</h2>
                </div>
                <div className='numbers-rising-left'>
                    <div className='weightlifter-icon2'></div>
                    <div className='number'>
                  <p className='countNum'>
                        {
                            counterOn && (
                                <CountUp start={0} end={800} duration={2} delay={0}/>
                            )
                        }

                    </p>
                    <FaCirclePlus className='plusIcon'/>
                  </div>
                  <h2 className='textIcon'>HEALTHY LIFE</h2>
                </div>
                <div className='numbers-rising-right'>
                <div className='dumbell-icon'></div>
                  <div className='number'>
                  <p className='countNum'>
                        {
                            counterOn && (
                                <CountUp start={0} end={1100} duration={2} delay={0}/>
                            )
                        }

                    </p>
                    <FaCirclePlus className='plusIcon'/>
                  </div>
                  <h2 className='textIcon'>MODERN EQUIPMENT</h2>
                </div>
                </div>
            </ScrollTrigger>

        </div>

    </div>
  )
}

export default AboutGym
