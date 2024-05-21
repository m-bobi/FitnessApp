import React, { useState } from "react";
import Navbar from "../shared/Navbar/Navbar";
import "./SignUp.css";
import config from "../../config";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../Inputs/Input";

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
    image: null,
  });

  function handleSubmit(event) {
    event.preventDefault();

    const {
      email,
      username,
      name,
      address,
      mobile,
      age,
      password,
      confirmPassword,
      gender,
      image,
    } = formData;

    if (
      !email ||
      !username ||
      !name ||
      !address ||
      !mobile ||
      !age ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    const allowedExtensions = ["png", "jpg", "jpeg", "webp"];
    const fileExtension = image.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      toast.error(
        "Only .png, .jpg, .jpeg, and .webp file formats are allowed."
      );
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("image", image);

    axios
      .post(`${config.apiBaseURL}api/UploadImages/addUserImage`, formDataObj)
      .then((imageResponse) => {
        return axios.post(`${config.apiBaseURL}api/User/register`, {
          ...formData,
          image: imageResponse.data,
        });
      })
      .then(() => {
        toast.success("You've successfully registered!");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          "An error occurred while registering. Please try again later."
        );
      });
  }

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  return (
    <div className="fix">
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
              <form className="w-full flex-1 mt-8" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                  <InputField
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    name="mobile"
                    placeholder="Mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                  <InputField
                    type="file"
                    name="image"
                    placeholder="Image"
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                  <InputField
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <InputField
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <InputField
                    type="select"
                    name="gender"
                    placeholder="Select Gender"
                    value={formData.gender}
                    onChange={handleChange}
                    options={["Male", "Female", "Other"]}
                  />

                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to terms and service
                  </p>
                  <div className="my-12 border-b text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Or{" "}
                      <Link to="/signin" className="text-blue-800">
                        sign in
                      </Link>
                    </div>
                  </div>
                </div>
              </form>

              <button
                onClick={handleSubmit}
                type="submit"
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
            </div>
          </div>
          <div className="flex-1 bg-gray-300 text-center hidden lg:flex justify-center p-3 pt-20 pb-20">
            <div className="m-12 xl:m-16 w-full signUp"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
