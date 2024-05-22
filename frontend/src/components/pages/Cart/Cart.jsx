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


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

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
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleDeleteCard = (id) => {
    const updatedSavedCards = cart.filter((card) => card.productId !== id);
    localStorage.setItem("cart", JSON.stringify(updatedSavedCards));

    setTimeout(() => {
      setCart(updatedSavedCards);
    }, 100);
  };

  return (
    <div className="productContainer">
      {cart && cart.length > 0 ? (
        cart.map((p) => {
          return (
            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Link href="#">
                <img src={`/img/products/${p.productImage}`} />
              </Link>
              <div class="px-5 pb-5">
                <Link href="#">
                  <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {p.productName}
                  </h5>
                </Link>
                <div class="flex items-center mt-2.5 mb-5">
                  <div class="flex items-center space-x-1 rtl:space-x-reverse">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${
                          index < 4
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
                  <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                    5.0
                  </span>
                </div>
                <p>Only {p.productStock} left</p>
                <div class="flex items-center justify-between">
                  <span class="text-3xl font-bold text-gray-900 dark:text-white">
                    {p.productPrice}$
                  </span>
                  <button
                    onClick={() => handleDeleteCard(p.productId)}
                    type="button"
                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Remove from Cart
                  </button>
                    <button
                      onClick={handleCheckout}
                      type="button"
                      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                    >
                      Proceed to Checkout
                    </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No products for the moment! Sorry</div>
      )}
    </div>
  );
};

export default Cart;
