import React, { useState } from 'react'
import './AboutGym.css'
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import { FaCirclePlus } from "react-icons/fa6";

const AboutGym = () => {
    const [counterOn,setCounterOn] = useState(false);
  return (
    <div className="aboutGym">
      <div className="aboutGym-leftSide">
        <div className="redBadge"></div>
        <div className="aboutGym-leftSide-img"></div>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4" data-aos="fade-left">
        <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl">
          ABOUT ASCEND
        </p>
        <div className="mt-4">
          <p className="text-sm md:text-base lg:text-lg xl:text-xl">
            Get your dream body shape with us!
          </p>
        </div>

        <div className="mt-4">
          <p className="text-xs md:text-sm lg:text-base xl:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
            totam odio nisi facilis quaerat voluptatibus reprehenderit, pariatur
            consectetur sit omnis!
          </p>
        </div>

        <ScrollTrigger
          onEnter={() => setCounterOn(true)}
          onExit={() => setCounterOn(false)}
          className="mt-4"
        >
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
              <div className="weightlifter-icon"></div>
              <div className="mt-2">
                <p className="text-sm md:text-base lg:text-lg xl:text-xl">
                  {counterOn && (
                    <CountUp start={0} end={1500} duration={2} delay={0} />
                  )}
                </p>
                <FaCirclePlus className="plusIcon" />
              </div>
              <h2 className="text-xs md:text-sm lg:text-base xl:text-lg">
                TRAINED PEOPLE
              </h2>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
              <div className="dumbell-icon"></div>
              <div className="mt-2">
                <p className="text-sm md:text-base lg:text-lg xl:text-xl">
                  {counterOn && (
                    <CountUp start={0} end={800} duration={2} delay={0} />
                  )}
                </p>
                <FaCirclePlus className="plusIcon" />
              </div>
              <h2 className="text-xs md:text-sm lg:text-base xl:text-lg">
                HEALTHY LIFE
              </h2>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
              <div className="weightlifter-icon2"></div>
              <div className="mt-2">
                <p className="text-sm md:text-base lg:text-lg xl:text-xl">
                  {counterOn && (
                    <CountUp start={0} end={1100} duration={2} delay={0} />
                  )}
                </p>
                <FaCirclePlus className="plusIcon" />
              </div>
              <h2 className="text-xs md:text-sm lg:text-base xl:text-lg">
                MODERN EQUIPMENT
              </h2>
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </div>
  );
}

export default AboutGym
