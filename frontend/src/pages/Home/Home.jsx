import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'

import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-purple-50">
      <Navbar/>
      <main>
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
            with Ascend Fitness
          </h1>
          <button className="bg-purple-600 text-white px-8 py-3 mt-6 rounded hover:bg-purple-700">
            Get Started
          </button>
        </section>

        <section className="bg-purple-100 py-20">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Elevate your fitness routine",
                description: "Unlock your full potential and reach new heights.",
                iconPath: "M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z",
              },
              {
                title: "Better Sleep",
                description: "Experience deep, restful sleep and wake up feeling rejuvenated.",
                iconPath: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
              },
              {
                title: "Less Stress",
                description: "Reduce stress and improve your mental wellbeing.",
                iconPath: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-md">
                <svg className="w-12 h-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d={item.iconPath} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Join Ascend Fitness community and connect with like-minded individuals
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  quote: "I feel energized and motivated.",
                  author: "Mark G.",
                  role: "Personal Trainer",
                },
                {
                  quote: "Ascend Fitness is the perfect tool for achieving your goals.",
                  author: "Sarah B.",
                  role: "Fitness Blogger",
                },
                {
                  quote: "Fitness is not just a hobby, it's a lifestyle.",
                  author: "Emily T.",
                  role: "Yoga Instructor",
                },
                {
                  quote: "Find balance and harmony in your life.",
                  author: "John D.",
                  role: "Adventure Enthusiast",
                },
              ].map((testimonial, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                  <blockquote className="text-lg mb-4">{testimonial.quote}</blockquote>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-purple-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Choose your plan</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Basic",
                  price: "$19/month",
                  features: [
                    "10 workouts monthly",
                    "Exercise library",
                    "Join the fitness community",
                  ],
                },
                {
                  name: "Pro",
                  price: "$46/month",
                  features: [
                    "20 workouts monthly",
                    "Exercise library",
                    "Join the fitness community",
                  ],
                },
                {
                  name: "Premium",
                  price: "$64/month",
                  features: [
                    "Unlimited workouts",
                    "Exercise library",
                    "Join the fitness community",
                  ],
                },
              ].map((plan, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-4">{plan.price}</div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full px-4 py-2 rounded ${index === 1 ? "bg-purple-600 text-white" : "border border-gray-300 hover:bg-gray-100"}`}>
                    {index === 0 ? "Choose Basic" : index === 1 ? "Choose Pro" : "Choose Premium"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6">
              <h4 className="font-bold mb-2">About Us</h4>
              <ul className="space-y-1">
                <li><Link className="text-gray-600 hover:text-gray-900" href="#">Our Story</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-900" href="#">Careers</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-900" href="#">Blog</Link></li>
              </ul>
            </div>

            <div className="w-full md:w-1/4 mb-6">
              <h4 className="font-bold mb-2">Support</h4>
              <ul className="space-y-1">
                <li><Link className="text-gray-600 hover:text-gray-900" href="#">Contact Us</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-900" href="#">FAQs</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-900" href="#">Privacy Policy</Link></li>
              </ul>
            </div>

            <div className="w-full md:w-1/4 mb-6">
              <h4 className="font-bold mb-2">Connect</h4>
              <ul className="space-y-1">
                <li><Link className="text-gray-600 hover:text-gray-900" href="#">Facebook</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-900" href="#">Instagram</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-900" href="#">Twitter</Link></li>
              </ul>
            </div>

            <div className="w-full md:w-1/4 mb-6">
              <h4 className="font-bold mb-2">Subscribe</h4>
              <p className="text-gray-600 mb-2">Join our mailing list for updates.</p>
              <input
                type="email"
                className="border border-gray-300 p-2 w-full rounded mb-2"
                placeholder="Your email"
              />
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-600 text-sm py-4">
          © 2024 Ascend Fitness. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

