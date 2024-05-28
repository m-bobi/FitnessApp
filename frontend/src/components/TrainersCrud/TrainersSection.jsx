import React, { useEffect, useState } from "react";
import "./TrainersSection.css";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../../config";


const TrainersSection = () => {


  const [isOpen, setIsOpen] = useState(false);


  const toggleModal = () => {
    setIsOpen(!isOpen);
  };



  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [editedTrainer, setEditedTrainer] = useState({});

  const handleEdit = (Trainer) => {
    setSelectedTrainer(Trainer);
    setEditedTrainer(Trainer);
  };

  const handleEditField = (field, value) => {
    setEditedTrainer({ ...editedTrainer, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${config.apiBaseURL}updateTrainer/${selectedTrainer.trainerId}`,
        editedTrainer
      );
      setSelectedTrainer(null);
      setEditedTrainer({});
    } catch (error) {
      console.error("Error updating Trainer:", error);
    }
  };

  const [trainerName, setTrainerName] = useState("");
  const [trainerType, setTrainerType] = useState("");
  const [trainerEmail, setTrainerEmail] = useState("");
  const [trainerImage, setTrainerImage] = useState("");
  const [trainerAddress, setTrainerAddress] = useState("");

  const addTrainer = async (event) => {
    event.preventDefault();
    try {
      axios
        .post(`${config.apiBaseURL}addTrainer`, {
          trainerName: trainerName,
          trainerEmail: trainerEmail,
          trainerAddress: trainerAddress,
          trainerType: trainerType,
          trainerImage: trainerImage,
        })
        .then(() => {
          console.log("success");
          setTrainerName("");
          setTrainerType("");
          setTrainerEmail("");
          setTrainerImage("");
          setTrainerAddress("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [trainers, setTrainers] = useState([]);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}getAllTrainers`);
      setTrainers(response.data);
    } catch (error) {
      console.error("Error fetching Trainers:", error);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, [trainers]);

  const onDelete = async (id) => {
    try {
      await axios
        .delete(`${config.apiBaseURL}deleteTrainer/${id}`)
        .then(() => {
          fetchTrainers();
        });
    } catch (error) {
      error.console(error);
    }
  };

  return (
    <div className="trainersSection">
      {/* Modal toggle */}
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="createButton block text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-900"
        type="button"
        onClick={toggleModal}
      >
        Create Trainer
      </button>

      {/* Main modal */}
      {isOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 bTrainer-b rounded-t dark:bTrainer-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create a new trainer!
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
              {/* Modal body */}
              <div className="p-4 md:p-5">
                <form
                  className="space-y-4 myForm"
                  onSubmit={addTrainer}
                  method="POST"
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Trainer Name
                    </label>
                    <input
                      type="text"
                      name="TrainerName"
                      id="email"
                      className="bg-gray-50 bTrainer bTrainer-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:bTrainer-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:bTrainer-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter trainer name"
                      onChange={(event) => {
                        setTrainerName(event.target.value);
                      }}
                      value={trainerName}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Trainer Email
                    </label>
                    <input
                      type="text"
                      name="TrainerEmail"
                      id="password"
                      placeholder="Enter trainer email"
                      className="bg-gray-50 bTrainer bTrainer-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:bTrainer-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:bTrainer-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={(event) => {
                        setTrainerEmail(event.target.value);
                      }}
                      value={trainerEmail}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Trainer Adress
                    </label>
                    <input
                      type="text"
                      name="TrainerAdress"
                      id="password"
                      placeholder="Enter trainer adress"
                      className="bg-gray-50 bTrainer bTrainer-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:bTrainer-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:bTrainer-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={(event) => {
                        setTrainerAddress(event.target.value);
                      }}
                      value={trainerAddress}
                    />
                  </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Trainer Type
                      </label>
                      <select
                        name="TrainerType"
                        id="trainerType"
                        className="bg-gray-50 bTrainer bTrainer-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:bTrainer-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:bTrainer-gray-500 dark:placeholder-gray-400 dark:text-white"
                        value={trainerType}
                        onChange={(event) => {
                          setTrainerType(event.target.value);
                        }}
                        required
                      >
                        <option value="" selected>
                          Select Trainer Type
                        </option>
                        <option value="Yoga">Yoga</option>
                        <option value="Karate">Karate</option>
                        <option value="Boxing">Boxing</option>
                      </select>
                    </div>

                    <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Trainer Image
                    </label>
                    <input
                      type="text"
                      name="TrainerImage"
                      id="password"
                      placeholder="Trainer image"
                      className="bg-gray-50 bTrainer bTrainer-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:bTrainer-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:bTrainer-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={(event) => {
                        setTrainerImage(event.target.value);
                      }}
                      value={trainerImage}
                    />
                    </div>

                  <button
                    type="submit"
                    className="createButton w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add Trainer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="allTrainers">
        <div className="allTrainersHeading">
          <p>
            <span className="redP">Our</span> Trainers
          </p>
        </div>

        <div className="allTrainersCards flex flex-wrap justify-center">
          {trainers &&
            trainers.map((t, index) => {
              return (
                <div className="trainerCard  rounded overflow-hidden shadow-lg ">
                  <div className="px-6 py-4 middleContentTrainerCard">
                    <div className="font-bold text-xl mb-2">
                      {t.trainerName}
                    </div>
                    <p className="text-gray-700 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptatibus quia, nulla! Maiores et perferendis eaque,
                      exercitationem praesentium nihil.
                    </p>
                    <div
                      className="imageOfTrainer"
                      style={{ backgroundImage: `url(${t.trainerImage})` }}
                    ></div>
                    <p>Contact the trainer: {t.trainerEmail}</p>
                    <p>Trainer is located at: {t.trainerAddress}</p>
                    <p className="trainerType">{t.trainerType}</p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-4 rounded-full"
                      onClick={() => onDelete(t.trainerId)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => handleEdit(t)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        {selectedTrainer && (
          <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 flex flex-col "
          >
            <div className="editModal">
              <div className="flex items-center justify-between p-4 md:p-5 bTrainer-b rounded-t dark:bTrainer-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Update trainer!
                </h3>
                <button
                  type="button"
                  className=" end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                  onClick={handleUpdate}
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
              {Object.keys(editedTrainer).map(
                (field) =>
                  // Check if the field is not trainerId and not permissionId
                  field !== "trainerId" &&
                  field !== "permissionId" && (
                    <div
                      key={field}
                      className="mb-2 relative p-4 w-full max-w-md "
                    >
                      <label className="block mb-1 text-sm font-medium ">
                        {field}
                      </label>
                      {field === "trainerType" ? (
                        <select
                          value={editedTrainer[field]}
                          onChange={(e) =>
                            handleEditField(field, e.target.value)
                          }
                          className="editInputs bg-gray-100  gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:blue-500 block w-full p-2.5 dark:bg-gray-600 dark:gray-500 dark:placeholder-gray-400 dark:text-white"
                        >
                          <option value="Yoga">Yoga</option>
                          <option value="Karate">Karate</option>
                          <option value="Boxing">Boxing</option>
                          {/* Add more options as needed */}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={editedTrainer[field]}
                          onChange={(e) =>
                            handleEditField(field, e.target.value)
                          }
                          readOnly={field === "trainerId"}
                          className="editInputs bg-gray-100  gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:blue-500 block w-full p-2.5 dark:bg-gray-600 dark:gray-500 dark:placeholder-gray-400 dark:text-white"
                        />
                      )}
                    </div>
                  )
              )}

              <button
                className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded updateButton"
                onClick={handleUpdate}
              >
                Update Trainer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainersSection;
