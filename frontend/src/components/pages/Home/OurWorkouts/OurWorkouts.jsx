import React, { useEffect, useState } from "react";
import "./OurWorkouts.css";
import Cookies from "js-cookie";
import api, { setAuthToken } from "../../../Auth/api";
import { toast, ToastContainer } from "react-toastify";

const OurWorkouts = () => {
  const token = Cookies.get("token");
  const userId = Cookies.get("id");

  const [workouts, setWorkouts] = useState([]);
  const fetchWorkouts = async () => {
    try {
      const response = await api.get(
        `api/Workouts/getAllWorkouts`,
        setAuthToken(token)
      );
      setWorkouts(response.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleAddWorkout = async (workoutId) => {
        const workoutExists = await api.get(
          `api/Workouts/getWorkout/${workoutId}`
        );
        if (!workoutExists) {
          console.error("Workout does not exist");
          toast.error(
            "Workout does not exist! Please, select a valid workout!"
          );
          return;
        }
    try {
      await api.post(`api/Workouts/addUserWorkout/${userId}/${workoutId}`);
      toast.success("Workout added successfully!");
    } catch (error) {
      console.error("Error adding Workout:", error);
      toast.error("Error adding Workout! Please, contact a staff member!");
    }
  };

  return (
    <div className="ourWorkouts">
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
      <h1>Our Workouts</h1>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Workout
              </th>
              <th scope="col" class="px-6 py-3">
                Start Time
              </th>
              <th scope="col" class="px-6 py-3">
                End Time
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {workouts && workouts.length > 0 ? (
              workouts.map((w) => {
                return (
                  <tr
                    key={w.workoutId}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {w.workoutType}
                    </th>
                    <td class="px-6 py-4">{w.workoutStartTime}</td>
                    <td class="px-6 py-4">{w.workoutEndTime}</td>
                    <td class="px-6 py-4">
                      <button
                        onClick={() => handleAddWorkout(w.workoutId)}
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p className="text-white p-12">No workouts available yet.</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OurWorkouts;
