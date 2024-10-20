import React, { useEffect, useState } from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import Navbar from "../shared/Navbar/Navbar";
import InputField from "../Inputs/Input";
import Cookies from "js-cookie";
import { FaGoogle, FaUserPlus } from "react-icons/fa";
import api, { setAuthToken } from "../Auth/api";
import { validateEmail, runValidations } from "../../utils/Validations";

const SignIn = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        const { email, password } = formData;

        const error = await runValidations([
            () => (!email || !password) && "Please fill in all fields.",
            () => !validateEmail(email) && "Please enter a valid email address.",
        ]);

        if (error) {
            toast.error(error);
            return;
        }

        try {
            const response = await api.post(`api/User/login`, {
                email: formData.email,
                password: formData.password,
            });

            if (response.status === 200) {
                const { token, refreshToken } = response.data;

                Cookies.set("token", token, { expires: 7, secure: true });
                Cookies.set("refreshToken", refreshToken, { expires: 7, secure: true });

                const decodedToken = jwtDecode(token);

                const userId =
                    decodedToken[
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                    ];

                if (userId) {
                    Cookies.set("id", userId, { expires: 7, secure: true });
                } else {
                    console.error("User ID not found in token.");
                }
                setAuthToken(token);
                toast.success("You've successfully logged in! Redirecting..");

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                toast.error("Login failed. Please check your email and password.");
            }
        } catch (error) {
            toast.error(
                "An error occurred while logging in. Please try again later."
            );
        }
    };

    const handleSignOut = () => {
        Cookies.remove("token");
        Cookies.remove("id");
        Cookies.remove("refreshToken");
        localStorage.removeItem("cart");


        navigate("/signin");
    };

    return (
        <div>
        <Navbar />

        <div className="min-h-screen bg-gray-dark text-gray-900 flex justify-center items-center">
        <ToastContainer
        position="bottom-right"
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
        <h1 className="text-2xl xl:text-3xl font-extrabold">Sign in</h1>
        <div className="w-full flex-1 mt-8">

        <div className="mx-auto max-w-xs">
        <InputField
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        />
        <InputField
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        />

        <button
        onClick={handleSubmit}
        className="mt-5 tracking-wide font-semibold bg-sign text-gray-100 w-full py-4 rounded-lg hover:bg-red-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >

        <span className="flex items-center">
        <FaUserPlus className="mr-2" />
        Sign in
        </span>
        </button>


        <div className="my-12 border-b text-center">
        <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
        Or sign in with Google
        </div>
        </div>


        <div className="flex flex-col items-center">
        <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-red-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
        <span className="flex items-center">
        <FaGoogle className="mr-2" />
        Google
        </span>
        </button>

        </div>
       <div className="my-12 border-b text-center">
        <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
        If you don't have an account{" "}
        <Link to="/signup" className="text-blue-800">
        click here
        </Link>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    );
};

export default SignIn;
