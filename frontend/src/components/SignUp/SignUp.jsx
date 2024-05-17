import React, { useState } from "react";
import Navbar from "../shared/Navbar/Navbar";
import "./SignUp.css";
import config from "../../config";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    name: "",
    address: "",
    mobile: "",
    age: 0,
    password: "",
    gender: "",
    confirmPassword: "",
    image: null
  });

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.email || !formData.username || !formData.name || !formData.address || !formData.mobile || !formData.age || !formData.password || !formData.confirmPassword || !formData.gender) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    const allowedExtensions = ["png", "jpg", "jpeg", "webp"];
    const fileExtension = formData.image.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      toast.error("Only .png, .jpg, .jpeg, and .webp file formats are allowed.");
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append("image", formData.image);

      const imageResponse = await axios.post(
        `${config.apiBaseURL}api/UploadImages/addUserImage`,
        formDataObj
      );

      await axios.post(`${config.apiBaseURL}api/User/register`, {
        ...formData,
        image: imageResponse.data
      });

      toast.success("You've successfully registered!");
      navigate("/signIn");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while registering. Please try again later.");
    }
  }

return (
  <div class="fix">
    <HelmetProvider>
      <div>
        <Helmet>
          <title>Ascend | Sign Up</title>
        </Helmet>
      </div>
    </HelmetProvider>
    <Navbar />
    <div className="min-h-screen bg-gray-dark text-gray-900 flex justify-center items-center">
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

      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
            <form className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(event) => setFormData({ ...formData, username: event.target.value })}
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  name="address"
                  placeholder="Adress"
                  value={formData.address}
                  onChange={(event) => setFormData({ ...formData, address: event.target.value })}
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={(event) => setFormData({ ...formData, mobile: event.target.value })}
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="file"
                  name="image"
                  accept=".png,.jpg,.jpeg,.webp"
                  placeholder="Image"
                  onChange={(event) => setFormData({ ...formData, image: event.target.files[0] })}
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(event) => setFormData({ ...formData, age: event.target.value })}
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
                />

                <select
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  name="gender"
                  value={formData.gender}
                  onChange={(event) => setFormData({ ...formData, gender: event.target.value })}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>


                <button
                  onClick={handleSubmit}
                  type="button"
                  className="mt-5 tracking-wide font-semibold bg-gray-400 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to terms and service
                </p>
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or{" "}
                    <Link to="/signIn" className="text-blue-800">
                      sign in
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="flex-1 bg-gray-300 text-center hidden lg:flex justify-center p-3 pt-20 pb-20">
          <div class="m-12 xl:m-16 w-full signUp"></div>
        </div>
      </div>
    </div>
  </div>
);
};

export default SignUp;
