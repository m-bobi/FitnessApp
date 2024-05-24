import React, { useEffect, useState } from 'react'
import './Products.css';
import axios from 'axios';
import config from '../../../config';
import { Link } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseURL}api/Products/getAllofProducts`
        );
        setProducts(response.data);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, );




  const addToCart = (product) => {
   const savedProducts = JSON.parse(localStorage.getItem('cart')) || [];
      const newProduct = product;


  if (!savedProducts.some((product) => product.productId === newProduct.productId)) {
    savedProducts.push(newProduct);
    localStorage.setItem('cart', JSON.stringify(savedProducts));


  }
  };

  return (
    <>
    <div className="productBanner">
      <div className="homeBannerContainer" data-aos="fade-right">
        <p className="firstText">Our Products</p>
      </div>
    </div>

    <div className='productContainer'>
    {
      products && products.length > 0 ? (
        products.map((p) => {
          return(
            <Link
           to={`/productDetails/${p.productId}`}
             class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 productCart">
            <div>
                <img  src={`/img/products/${p.productImage}`}  />
            </div>
            <div class="px-5 pb-5">
                <Link href="#">
                    <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{p.productName}</h5>
                </Link>
                <div class="flex items-center mt-2.5 mb-5">
                    <div class="flex items-center space-x-1 rtl:space-x-reverse">
                    {[...Array(5)].map((_, index) => (
                        <svg key={index} className={`w-4 h-4 ${index < p.productRate ? 'text-yellow-300' : 'text-gray-200 dark:text-gray-600'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                    </div>
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                </div>
                <p>Only {p.productStock} left</p>
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">{p.productPrice}$</span>
                  {
                    token && (
                      <Link
                      onClick={() => addToCart(p)}
                       class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex space-between items-center gap-x-5">
                      <FaCartPlus className='cartIconProduct' />
                        Add to cart
                        </Link>
                    )
                  }
                </div>
            </div>
        </Link>
          )
        })
      ) : (
        <div>No products for the moment! Sorry</div>
      )
    }
    </div>
    </>
  );
}

export default Products