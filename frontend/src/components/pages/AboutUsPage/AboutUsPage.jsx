import React from "react";
import Navbar from "../../shared/Navbar/Navbar";
import logo from "../../../assets/logo.png";
import medclass from "../../../assets/meditationClass.webp";

const AboutUsPage = () => {
  return (
    <div>
      <Navbar />
      <section className="pt-20 py-14 lg:py-24 relative z-0 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl md:leading-normal">
            Reach Your Peak with <span className="text-red-600">Ascend</span>
          </h1>
          <p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
            Transform your fitness journey with our state-of-the-art facilities
            and expert guidance.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
            <div className="img-box">
              <img src={logo} alt="Ascend Gym" className="max-lg:mx-auto" />
            </div>
            <div className="lg:pl-[100px] flex items-center">
              <div className="data w-full">
                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center relative">
                  About Us
                </h2>
                <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                  At Ascend, we are dedicated to providing a holistic fitness
                  experience. Our gym is equipped with the latest technology and
                  our trainers are here to support you every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9">
            <div className="lg:pr-24 flex items-center">
              <div className="data w-full">
                <img
                  src={medclass}
                  alt="Ascend Gym"
                  className="block lg:hidden mb-9 mx-auto"
                />
                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center">
                  Inspiring Fitness Since 2010
                </h2>
                <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                  Since our founding in 2010, Ascend has been committed to
                  creating an inclusive and motivating environment. We believe
                  in pushing boundaries and achieving new heights together.
                </p>
              </div>
            </div>
            <div className="img-box">
              <img
                src={medclass}
                alt="Ascend Gym"
                className="hidden lg:block"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
