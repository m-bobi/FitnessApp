import React, { useEffect, useState } from "react";
import "./Products.css";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import Cookies from "js-cookie";
import api from "../../Auth/api";
import {toast, ToastContainer} from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const token = Cookies.get("token");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(
          `api/Products/getAllofProducts`
        );
        setProducts(response.data);
      } catch (error) {
        toast.error("Error fetching products! Please, contact a staff member!")
      }
    };

    fetchProducts();
  },[]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const addToCart = (product) => {
    const savedProducts = JSON.parse(localStorage.getItem("cart")) || [];
    const newProduct = product;

    if (
      !savedProducts.some(
        (product) => product.productId === newProduct.productId
      )
    ) {
      savedProducts.push(newProduct);
      localStorage.setItem("cart", JSON.stringify(savedProducts));
    }
  };


  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (category === "All") {
      setSelectedCategories([]);
    } else {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  }
  };

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.productCategory);
    const matchSearch =
      searchTerm === "" ||
      product.productName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

      const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };


      const categoryCounts = products.reduce((acc, product) => {
        acc[product.productCategory] = (acc[product.productCategory] || 0) + 1;
        return acc;
      }, {});

      const totalCount = products.length;

  return (
    <>
      <ToastContainer
        position="bottom-right"
        padding="5%"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="productBanner">
        <div className="homeBannerContainer" data-aos="fade-right">
          <p className="firstText">Our Products</p>
        </div>
      </div>

      <div className="filterContainer flex items-center justify-center p-4 flex-col gap-2.5">
        <button
          id="dropdownDefault"
          data-dropdown-toggle="dropdown"
          className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
          onClick={toggleDropdown}
        >
          Filter by category
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <div
          id="dropdown"
          className={`z-10 w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700 ${
            isDropdownOpen ? "flex flex-col" : "hidden"
          }`}
        >
          <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </h6>
          <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
            {["Suplements", "Equipments", "All"].map((category) => (
              <li key={category} className="flex items-center">
                <input
                  id={category}
                  type="checkbox"
                  value={category}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={handleCategoryChange}
                />
                <label
                  htmlFor={category}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {category === "All"
                    ? `All (${totalCount})`
                    : `${category} (${categoryCounts[category] || 0})`}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center">
        <form className="p-5 w-4/5">
          <label
            for="search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={handleSearchChange}
              type="search"
              id="search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by product name"
              required
            />
            <button
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="productContainer">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((p) => {
            return (
              <Link
                to={`/productDetails/${p.productId}`}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 productCart"
              >
                <div>
                  <img src={`/img/products/${p.productImage}`} />
                </div>
                <div className="px-5 pb-5">
                  <Link href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {[...p.productName].map((letter, index) => (
                        <span
                          key={index}
                          style={{
                            fontWeight: searchTerm.includes(letter)
                              ? "bold"
                              : "normal",
                          }}
                        >
                          {letter}
                        </span>
                      ))}
                    </h5>
                  </Link>
                  <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
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
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                      5.0
                    </span>
                  </div>
                  <p>Only {p.productStock} left</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {p.productPrice}$
                    </span>
                    {token && (
                      <Link
                        onClick={() => addToCart(p)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex space-between items-center gap-x-5"
                      >
                        <FaCartPlus className="cartIconProduct" />
                        Add to cart
                      </Link>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No products available yet.</p>
        )}
      </div>
    </>
  );
};

export default Products;
