import React, { useState } from 'react'
import api from '../../Auth/api';
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

const ContactUs = () => {
    
    const userId = Cookies.get("id");

    // const [formData, setFormData] = useState({
    //     email: "",
    //     subject: "",
    //     message : ""
    //   });

    const [email,setEmail] = useState("");
    const [subject,setSubject] = useState("");
    const [message,setMessage] = useState("");



      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await api.post(`api/Contact/addContact`, {
            email: email,
            subject: subject,
            message : message,
            userId: userId
          }).then(() => {
            toast.success("Succesfuly sent");
            console.log(response);
          });
        } catch (error) {
          toast.error(
            "An error occurred while sending in. Please try again later."
          );
        }
      };
  return (
    <section class="bg-transparent dark:bg-gray-900 mt-40">

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
    <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
        <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
        <form  class="space-y-8" onSubmit={handleSubmit}>
            <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                <input
                   onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                 type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
            </div>
            <div>
                <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                <input
                   onChange={(event) => {
                    setSubject(event.target.value);
                  }}
                type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
            </div>
            <div class="sm:col-span-2">
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                <textarea
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
            </div>
            <button 
            type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-red-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
        </form>
    </div>
  </section>
  )
}

export default ContactUs
