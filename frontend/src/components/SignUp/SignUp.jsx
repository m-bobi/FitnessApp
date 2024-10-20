import React, { useState } from "react";
import Navbar from "../shared/Navbar/Navbar";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../Inputs/Input";
import {
  validateEmail,
  validatePassword,
  checkEmailExists,
  checkUsernameExists,
  validateUsername,
  runValidations,
  validatePhoneNumber,
} from "../../utils/Validations";
import api from "../Auth/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    name: "",
    address: "",
    mobile: "",
    birthdate: "",
    password: "",
    gender: "",
    confirmPassword: "",
    image: null,
  });
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {
        email,
        username,
        name,
        address,
        mobile,
        birthdate,
        password,
        confirmPassword,
        gender,
        image,
      } = formData;

      const error = await runValidations([
        () =>
          (!email ||
            !username ||
            !name ||
            !address ||
            !mobile ||
            !birthdate ||
            !password ||
            !confirmPassword ||
            !gender) &&
          "Please fill in all fields.",
        () => !validateEmail(email) && "Please enter a valid email address.",
        async () =>
          (await checkEmailExists(email)) && "This email is already in use.",
        () => !validateUsername(username) && "Please enter a valid username.",
        async () =>
          (await checkUsernameExists(username)) &&
          "This username is already in use.",
        () =>
          !validatePhoneNumber(mobile) && "Please enter a valid phone number.",

        () =>
          !validatePassword(password) &&
          "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
        () => password !== confirmPassword && "Passwords do not match.",
        () => {
          const allowedExtensions = ["png", "jpg", "jpeg", "webp"];
          const fileExtension = image.name.split(".").pop().toLowerCase();
          return (
            !allowedExtensions.includes(fileExtension) &&
            "Only .png, .jpg, .jpeg, and .webp file formats are allowed."
          );
        },
      ]);

      if (error) {
        toast.error(error);
        return;
      }

      const imageFormData = new FormData();
      imageFormData.append("image", formData.image);

      let imageName;
      try {
        const response = await api.post(
          `api/UploadImages/addUserImage`,
          imageFormData
        );
        imageName = response.data;
      } catch (error) {
        console.error(error);
        toast.error(
          "An error occurred while uploading the image. Please try again later."
        );
        return;
      }

      const userData = {
        ...formData,
        image: imageName,
      };

      api
        .post(`api/User/register`, userData)
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
    } catch (error) {
      console.error(error);
      toast.error(
        "An error occurred while registering. Please try again later."
      );
    }
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
              <h1 className="text-2xl xl:text-5xl font-extrabold">Sign up</h1>
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
                    placeholder="Phone Number"
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
                    type="date"
                    name="birthdate"
                    placeholder="Birthdate"
                    value={formData.birthdate}
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

                <button className="mt-5 tracking-wide font-semibold bg-gray-400 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
