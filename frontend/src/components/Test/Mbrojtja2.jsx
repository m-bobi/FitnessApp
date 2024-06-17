import React, { useEffect, useState } from 'react'
import api from '../Auth/api';

const Mbrojtja2 = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

    const [isOpenPlayers, setIsOpenPlayers] = useState(false);

    const toggleModalPlayers = () => {
        setIsOpenPlayers(!isOpenPlayers);
    };

    const [shouldFetch, setShouldFetch] = useState(false);
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const [SatelliteName, setSatelliteName] = useState("");

    const [planetID, setPlanetID] = useState(0);

    const [planets, setPlanets] = useState([]);
    const [players, setPlayers] = useState([]);

    const [newType, setNewType] = useState('');

    const [satellites, setSatellites] = useState([]);
    
    const [playerName, setPlayerName] = useState("");
    const [playerNumber, setPlayerNumber] = useState(0);
    const [playerBirthYear, setPlayerBirthYear] = useState(0);
    const [teamId, setTeamId] = useState(0);

    const [selectedTeam, setSelectedTeam] = useState(null);
    const [editedTeam, setEditedTeam] = useState({
      teamId: "",
      name: ""
    });


      const addPlanet = (event) => {
        event.preventDefault();
        try {
          api
            .post(
              `api/Planet/addPlanet`,
              {
                name: name,
                type: type
              },
            )
            .then(() => {
              console.log("Planet has been added.");
              setShouldFetch(prev => !prev);
            })
            .catch((error) => {
              console.error("Error:", error);
              console.log(event);
            });
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const fetchPlanets = async () => {
        try {
          const response = await api.get("api/Planet/getAllPlanets");
          if(response.data){
            setPlanets(response.data);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
    
      useEffect(() => {
        fetchPlanets();
      },[shouldFetch])

      const fetchSatellites = async () => {
        try {
          const response = await api.get("api/Satellites/getAllSatellites");
          if(response.data){
            setSatellites(response.data);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
    
      useEffect(() => {
        fetchSatellites();
      },[shouldFetch])


      const addSatellite = (event) => {
        event.preventDefault();
        try {
          api
            .post(
              `api/Satellites/addSatellite`,
              {
                name: SatelliteName,
                planetID:planetID
              },
            )
            .then(() => {
              console.log("Satellite has been added.");
              setShouldFetch(prev => !prev);

            })
            .catch((error) => {
              console.error("Error:", error);
              console.log(event);
            });
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
      const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
          try {
            await api.delete(
              `api/Player/deletePlayer/${id}`,
              setPlayers(players.filter((p) => p.playerId !== id))
            );
            console.log("Product deleted successfully!")
          } catch (error) {
            console.error("Error deleting product:", error);
            console.error("Error deleting product!")
          }
        }
      }

      


      const handleEdit = (team) => {
        setSelectedTeam(team);
        setEditedTeam({
            teamId: team.teamId,
          name: team.name
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        await api.put(`api/Planet/${name}`, { type : newType });
        setShouldFetch(prev => !prev);
    };
    
    //   const handleEditField = (field, value) => {
    //     setEditedTeam({ ...editedTeam, [field]: value });
    //   };
    
    //   const handleUpdate = async (event) => {
    //     event.preventDefault();
    //     try {
    //       const teamUpdate = {
    //         teamId: editedTeam.teamId,
    //         name: editedTeam.name
    //       };
    //       await api.put(`api/Team/updateTeam/${teamUpdate.teamId}`, teamUpdate);
    //       setTeams(
    //         teams.map((t) =>
    //           t.teamId === selectedTeam.teamId ? { ...t, ...teamUpdate } : t
    //         )
    //       );
    //       setSelectedTeam(null);
    //       setEditedTeam({});
    //         console.log("User updated successfully");
    //     } catch (error) {
    //       console.log("Error updating user");
    //     }
    //   };


  return (
    <>
    <div className='p-20'>
           <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="mt-6 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-900 top-4 right-4 z-50"
        type="button"
        onClick={toggleModal}
      >
        Create Planet
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
                  Create a new planet!
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
                <form className="space-y-4" onSubmit={addPlanet}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Planet Name
                    </label>
                    <input
                      type="text"
                      name="classDescription"
                      placeholder="Enter className description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={(event) => {
                        setName(event.target.value)
                      }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Planet Type
                    </label>
                    <input
                      type="text"
                      name="classDescription"
                      placeholder="Enter className description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={(event) => {
                        setType(event.target.value)
                      }}
                    />
                  </div>


                  <button
                    type="submit"
                    className="createButton w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add Planet
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    <div className='p-20'>
           <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="mt-6 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-900 top-4 right-4 z-50"
        type="button"
        onClick={toggleModalPlayers}
      >
        Create Satellite
      </button>
      {isOpenPlayers && (
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
                  Create a player!
                </h3>
                <button
                  type="button"
                  className=" end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                  onClick={toggleModalPlayers}
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
                <form className="space-y-4" onSubmit={addSatellite}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Satellite Name
                    </label>
                    <input
                      type="text"
                      name="classDescription"
                      placeholder="Enter className description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={(event) => {
                        setSatelliteName(event.target.value)
                      }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Class Description
                    </label>
                    <select
                value={planetID}
                onChange={(e) => setPlanetID(e.target.value)}
                required
            >
                <option value="">Select Planet</option>
                {planets.map((p) => (
                    <option key={p.planetID} value={p.planetID}>
                        {p.name}
                    </option>
                ))}
            </select>
                  </div>


                  <button
                    type="submit"
                    className="createButton w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add Satellite
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    <div class="relative overflow-x-auto p-10">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
               Planet id
                </th>
                <th scope="col" class="px-6 py-3">
               Planet Name
                </th>
                <th scope="col" class="px-6 py-3">
               Planet Type
                </th>
                <th scope="col" class="px-6 py-3">
                Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {planets.map((p) => {
                return(
                 <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {p.planetID}
                    </td>
                    <td class="px-6 py-4">
                        {p.name}
                    </td>
                    <td class="px-6 py-4">
                        {p.type}
                    </td>
                    <td class="px-6 py-4">
                        <button
                        onClick={() => handleEdit(p)}
                        className='p-5 text-blue-500'>Edit</button>
                    </td>
                </tr>
                )
            })}
      
           
        </tbody>
    </table>
</div>

    <div class="relative overflow-x-auto p-10">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                Satellite ID
                </th>
                <th scope="col" class="px-6 py-3">
                Satellite Name
                </th>
                <th scope="col" class="px-6 py-3">
                Planet ID
                </th>
                <th scope="col" class="px-6 py-3">
                Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {satellites.map((s) => {
                return(
                 <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {s.satelliteID}
                    </td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {s.name}
                    </td>
                    <td class="px-6 py-4">
                        {s.planetID}
                    </td>
                    <td class="px-6 py-4">
                        <button
                         className='p-5 text-blue-500'>Edit</button>
                        <button
                         onClick={() => handleDelete(s.playerId)}
                        className='text-red-500'>Delete</button>
                    </td>
                </tr>
                )
            })}
      
           
        </tbody>
    </table>

    <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="text" value={newType} onChange={(e) => setNewType(e.target.value)} placeholder="New Type" />
            <button type="submit">Update Type</button>
        </form>
</div>

{selectedTeam && (
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
                  Update User!
                </h3>
                <button
                  onClick={() => setSelectedTeam(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              {/* <div className="p-4 md:p-5">
                <form className="space-y-4">
                  {Object.keys(editedTeam).map((field) => (
                    <div key={field} className="relative  w-full max-w-md">
                      <div className="p-4 md:p-5">
                        <label htmlFor="">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                          type="text"
                          placeholder={editedTeam[field]}
                          onChange={(e) =>
                            handleEditField(field, e.target.value)
                          }
                          className="border rounded-lg px-2 py-1 w-full text-slate-700"
                          readOnly={field === "id"}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
                    onClick={handleUpdate}
                  >
                    Update User
                  </button>
                </form>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Mbrojtja2

