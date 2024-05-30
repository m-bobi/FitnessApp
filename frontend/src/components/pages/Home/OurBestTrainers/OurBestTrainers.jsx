import React, { useEffect, useState } from 'react'
import './OurBestTrainers.css'
import Cookies from "js-cookie";
import api, {setAuthToken} from '../../../Auth/api';
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
const OurBestTrainers = () => {

    const [trainerUsers, setTrainerUsers] = useState([]);

    const fetchUsers = async () => {
        const token = Cookies.get('token');
        setAuthToken(token); 
    
        try {
          const response = await api.get("api/User/getAllUsers");
          const users = response.data;
    
          const trainers = users.filter(user => user.role === "Trainer");
          setTrainerUsers(trainers); 
          console.log(trainers)
        } catch (error) {
          toast.error("Error fetching users");
        }
      };
    
      useEffect(() => {
        fetchUsers();
      }, []);
  return (
    <div className='ourBestTrainers'>
           <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12 p-10">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Best Trainers
            </h2>
            <p classNameName="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Here at ascend we focus on building and growth.
            </p>
          </div>

<div className='trainersContainer container'>
{
    trainerUsers && trainerUsers.length > 0 ? (
        trainerUsers.map((tu) => {
           return(
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-10">
            <div className="flex justify-end px-4 pt-4">
                <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                    <span className="sr-only">Open dropdown</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                </button>
                <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                    </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`/img/users/${tu.image}`} />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{tu.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Trainer</span>
                <div className="flex mt-4 md:mt-6">
                    <Link href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-red-400 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</Link>
                </div>
            </div>
        </div>
           )
        })
    ) :(
        <div>No trainers for the moment!Sorry</div>
    )
}
</div>



    </div>
  )
}

export default OurBestTrainers
