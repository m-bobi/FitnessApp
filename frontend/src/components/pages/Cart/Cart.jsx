import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import config from "../../../config";

const stripePromise = loadStripe(
  `${config.stripeKey}`
);

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (cartItems) => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.productPrice,
      0
    );
    setTotal(totalPrice);
  };

const handleCheckout = async () => {
  const response = await axios.post(
    `${config.apiBaseURL}checkout/${cart[0].productId}`,
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


useEffect(() => {
  calculateTotal(cart);
}, [cart]);

  const handleDeleteCard = (id) => {
    const updatedSavedCards = cart.filter((card) => card.productId !== id);
    localStorage.setItem("cart", JSON.stringify(updatedSavedCards));

    setTimeout(() => {
      setCart(updatedSavedCards);
    }, 100);
  };
  const totalWithVariableAndPercent = total + (total * 0.075);
  return (
    <div className="cart">
      <div className="CartBanner">
      <div className="homeBannerContainer" data-aos="fade-right">
        <p className="firstText">Ascend - Cart</p>
      </div>
    </div>
    <div>
      <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
  <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">

    <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
      <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
        <div class="space-y-6">
        
          {
            cart && cart.length > 0 ? (
                cart.map((p) => {
                  return (
                    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <Link  class="shrink-0 md:order-1">
                        <img class="h-20 w-20 dark:hidden" src={`/img/products/${p.productImage}`}  />
                      </Link>
        
                      <label for="counter-input" class="sr-only">Choose quantity:</label>
                      <div class="flex items-center justify-between md:order-3 md:justify-end">
                        <div class="flex items-center">
                          <button type="button" id="decrement-button-4" data-input-counter-decrement="counter-input-4" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <input type="text" id="counter-input-4" data-input-counter class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value="1" required />
                          <button type="button" id="increment-button-4" data-input-counter-increment="counter-input-4" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                        <div class="text-end md:order-4 md:w-32">
                          <p class="text-base font-bold text-gray-900 dark:text-white">${p.productPrice}</p>
                        </div>
                      </div>
        
                      <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        
                        <a href="#" class="text-base font-medium text-gray-900 hover:underline dark:text-white">{p.productName}</a>

                        <div class="flex items-center space-x-1 rtl:space-x-reverse">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${
                          index < p.productRate
                            ? "text-yellow-300"
                            : "text-gray-200 dark:text-gray-600"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>
        
                        <div class="flex items-center gap-4">
                          <button
                            onClick={handleCheckout}
                           type="button" class="inline-flex items-center text-sm font-medium text-green-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                            Proceed to checkout
                          </button>
        
                          <button 
                          onClick={() => handleDeleteCard(p.productId)}
                          type="button" class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                            <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                            Remove
                          </button>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                })
            ) : (
              <div>No products for the moment! Sorry</div>
            )
          }
         
     
        </div>
      </div>

      <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p class="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

          <div class="space-y-4">
            <div class="space-y-2">
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">${total}</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                <dd class="text-base font-medium text-green-600">${total}</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">${total}</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">${totalWithVariableAndPercent}</dd>
              </dl>
            </div>

            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
              <dd class="text-base font-bold text-gray-900 dark:text-white">${totalWithVariableAndPercent}</dd>
            </dl>
          </div>

          <a href="#" class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</a>

          <div class="flex items-center justify-center gap-2">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
            <Link to="/products" title="" class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
              Continue Shopping
              <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
              </svg>
            </Link>
          </div>
        </div>

      
      </div>
    </div>
  </div>
</section>
    </div>
    </div>
   
  );
};

export default Cart;
