import React, { useState } from 'react';
import ChatBox from '../AITesting/ChatBox';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

const AboutGym = () => {
  const [counterOn, setCounterOn] = useState(false);

  return (
      <div className="flex flex-col md:flex-row items-center justify-center py-8 bg-white shadow-md rounded-lg p-10">
      <div className="md:w-1/2 lg:w-3/5 md:pl-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">About Ascend</h2>
        <p className="text-base md:text-lg mb-4">Get your dream body shape with us!</p>
        <p className="text-sm md:text-base mb-4">
          Join us and become part of a community that values health and fitness. We offer a variety of programs to help you achieve your goals.
        </p>

        <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🏋️</span>
              </div>
              <p className="text-xl font-bold mt-2">
                {counterOn && <CountUp start={0} end={1500} duration={2} />}
              </p>
              <h3 className="text-sm">Trained People</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🥗</span>
              </div>
              <p className="text-xl font-bold mt-2">
                {counterOn && <CountUp start={0} end={800} duration={2} />}
              </p>
              <h3 className="text-sm">Healthy Life</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🛠️</span>
              </div>
              <p className="text-xl font-bold mt-2">
                {counterOn && <CountUp start={0} end={1100} duration={2} />}
              </p>
              <h3 className="text-sm">Modern Equipment</h3>
            </div>
          </div>
        </ScrollTrigger>
      </div>
    <div className="md:w-1/2 lg:w-2/5 mt-6 md:mt-0">
        <ChatBox />
      </div>
    </div>
  );
};

export default AboutGym;

