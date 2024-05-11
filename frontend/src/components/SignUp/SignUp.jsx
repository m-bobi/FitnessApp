import React, { useState } from 'react';
import Navbar from '../shared/Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config'
const SignUp = () => {
  // const [formData, setFormData] = useState({
  //   email: '',
  //   username: '',
  //   name: '',
  //   address: '',
  //   mobile : '',
  //   age: 0,
  //   password: '',
  //   gender: ''
  // });

  const [email, setEmail] = useState('');
const [username, setUsername] = useState('');
const [name, setName] = useState('');
const [address, setAddress] = useState('');
const [mobile, setMobile] = useState('');
const [age, setAge] = useState(0);
const [password, setPassword] = useState('');
const [gender, setGender] = useState('');




const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.post("http://localhost:5259/api/User/register", {
      email: email,
      username: username,
      name: name,
      address: address,
      mobile: mobile,
      age: age,
      password : password,
      gender : gender
    });
    console.log("Success");
    window.alert("User has been registered.");
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-dark text-gray-900 flex justify-center items-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
              <form onSubmit={handleSubmit} className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">

                <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />


                    <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />

                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                
                <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="text"
                    name="address"
                    placeholder="Adress"
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                  />

                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="text"
                    name="mobile"
                    placeholder="Mobile"
                    onChange={(event) => {
                      setMobile(event.target.value);
                    }}
                  />

                    <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="text"
                    name="age"
                    placeholder="Age"
                    onChange={(event) => {
                      setAge(event.target.value);
                    }}
                  />

               

                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />

                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />



                  <select
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    name="gender"
                    onChange={(event) => {
                      setGender(event.target.value);
                    }}
                  >
                    <option value="" disabled selected>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>

            
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
        </div>
      </div>
    </div>
  );
};

export default SignUp;
