import React, { useEffect, useState } from 'react'
import "./OurOffers.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import config from "../../../../config";

const stripePromise = loadStripe(
  `${config.stripeKey}`
);
const OurOffers = () => {

    const [allOffers, setAllOffers] = useState([]);

    const token = localStorage.getItem("token");




    useEffect(() => {
        const fetchOffers = async () => {
          try {
            const response = await axios.get("http://localhost:5259/api/Offers/getAllOffers", {
            
            });
            setAllOffers(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(allOffers);
            console.error("Error fetching users:", error);
          }
        };
    
        fetchOffers();
      }, [token]);

      const getOfferTypeLabel = (offerType) => {
        switch (offerType) {
          case 'Monthly':
            return '/month';
          case 'Yearly':
            return '/year';
          case 'Weekly':
            return '/week';
          default:
            return '';
        }
      };

      const handleCheckout = async () => {
        const response = await axios.post(
          `${config.apiBaseURL}checkoutOffer/${allOffers[0].offerId}`,
          { quantity: 1 }
        );
      
        const session = response.data;
      
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      
        if (error) {
          console.error("Error:", error);
        }
      };

  return (
<>

        
		  <section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Offers</h2>
          <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at ascend we focus on building and  growth.</p>
      </div>
      <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
       {
        allOffers && allOffers.length > 0 ? (
                allOffers.map((o) => {
                    return(
                        <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                        <h3 class="mb-4 text-2xl font-semibold">{o.offerType}</h3>
                        <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">{o.offerDescription}</p>
                        <div class="flex justify-center items-baseline my-8">
                            <span class="mr-2 text-5xl font-extrabold">${o.offerPrice}</span>
                            <span class="text-gray-500 dark:text-gray-400">{getOfferTypeLabel(o.offerType)}</span>
                        </div>
                       
                        <ul role="list" class="mb-8 space-y-4 text-left">
                            <li class="flex items-center space-x-3">
                                <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                <span>Individual configuration</span>
                            </li>
                            <li class="flex items-center space-x-3">
                                <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                <span>No setup, or hidden fees</span>
                            </li>
                            <li class="flex items-center space-x-3">
                                <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                <span>Team size: <span class="font-semibold">10 developers</span></span>
                            </li>
                            <li class="flex items-center space-x-3">
                                <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                <span>Premium support: <span class="font-semibold">24 months</span></span>
                            </li>
                            <li class="flex items-center space-x-3">
                                <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                <span>Free updates: <span class="font-semibold">24 months</span></span>
                            </li>
                        </ul>
                        <Link
                        onClick={handleCheckout}
                         href="#" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Get started</Link>
                    </div>
                    )
                })
        ) : (
            <div>No Offers right now!!</div>
        )
       }
         
     
         
      </div>
  </div>
</section>
</>
  )
}

export default OurOffers
