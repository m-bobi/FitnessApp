import React from 'react';

const Hero = () => {
    return (
        <section className="container mx-auto px-4 py-20 text-center">
            <div className="mb-8">
                <svg
                    className="w-24 h-24 mx-auto"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                    <path d="M2 17L12 22L22 17" />
                    <path d="M2 12L12 17L22 12" />
                </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Transform your body
                <br />
                with Ascend
            </h1>
            <button className="bg-purple-600 text-white px-8 py-3 mt-6 rounded hover:bg-purple-700">
                Get Started
            </button>
        </section>
    );
};

export default Hero;

