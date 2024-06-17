import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie';
import api, {setAuthToken} from "../../../Auth/api";
import { useFetch } from "../../../Context/FetchContext";

const AddWorkouts = () => {
  const { triggerFetch } = useFetch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const token = Cookies.get('token');

  const [workoutType, setWorkoutType] = useState("");
  const [workoutStartTime, setWorkoutStartTime] = useState("");
  const [workoutEndTime, setWorkoutEndTime] = useState("");

  const addWorkout = (event) => {
    event.preventDefault();
    try {
      api
        .post(
          `api/Workouts/addWorkout`,
          {
            workoutType: workoutType,
            workoutStartTime: workoutStartTime,
            workoutEndTime: workoutEndTime,
          },
          setAuthToken(token)
        )
        .then(() => {
          triggerFetch();
          toast.success("Workout has been added.");
        })
        .catch((error) => {
          console.error("Error:", error);
          console.log(event);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="relative">
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
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="mt-6 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-900 ml-10 z-50"
        type="button"
        onClick={toggleModal}
      >
        Create Workout
      </button>

      {isOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create a new workout!
                </h3>
                <button
                  type="button"
                  className=" end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={addWorkout}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Workout Type
                    </label>
                    <input
                      type="text"
                      name="OrderTotalAmount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter Workout Type"
                      onChange={(event) => {
                        setWorkoutType(event.target.value);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Workout Start Time
                    </label>
                    <select
                      name="OrderStatus"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={(event) => {
                        setWorkoutStartTime(event.target.value);
                      }}
                    >
                      <option value="" disabled selected>
                        Select avaliable time
                      </option>
                      <option value="12:00-PM">12:00-PM</option>
                      <option value="13:00-PM">13:00-PM</option>
                      <option value="14:00-PM">14:00-PM</option>
                      <option value="15:00-PM">15:00-PM</option>
                      <option value="16:00-PM">16:00-PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Workout End Time
                    </label>
                    <select
                      name="UserID"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={(event) => {
                        setWorkoutEndTime(event.target.value);
                      }}
                    >
                      <option value="" disabled selected>
                        Select avaliable time
                      </option>
                      <option value="13:00-PM">13:00-PM</option>
                      <option value="14:00-PM">14:00-PM</option>
                      <option value="15:00-PM">15:00-PM</option>
                      <option value="16:00-PM">16:00-PM</option>
                      <option value="17:00-PM">17:00-PM</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="createButton w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add Workout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddWorkouts;

