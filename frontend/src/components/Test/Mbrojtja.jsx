import React, { useEffect, useState } from 'react'
import api from '../Auth/api';

const Mbrojtja = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

    const [isOpenPlayers, setIsOpenPlayers] = useState(false);

    const toggleModalPlayers = () => {
        setIsOpenPlayers(!isOpenPlayers);
    };

    const [name, setName] = useState("");
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    
    const [playerName, setPlayerName] = useState("");
    const [playerNumber, setPlayerNumber] = useState(0);
    const [playerBirthYear, setPlayerBirthYear] = useState(0);
    const [teamId, setTeamId] = useState(0);


      const addTeam = (event) => {
        event.preventDefault();
        try {
          api
            .post(
              `api/Team/addTeam`,
              {
                name: name,
              },
            )
            .then(() => {
              console.log("Team has been added.");
            })
            .catch((error) => {
              console.error("Error:", error);
              console.log(event);
            });
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const fetchTeams = async () => {
        try {
          const response = await api.get("api/Team/getAllTeams");
          setTeams(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
    
      useEffect(() => {
        fetchTeams();
      },[])

      const fetchPlayers = async () => {
        try {
          const response = await api.get("api/Player/getAllPlayers");
          setPlayers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
    
      useEffect(() => {
        fetchPlayers();
      },[])


      const addPlayer = (event) => {
        event.preventDefault();
        try {
          api
            .post(
              `api/Player/addPlayer`,
              {
                name: playerName,
                number: playerNumber,
                birthYear: playerBirthYear,
                teamId:teamId
              },
            )
            .then(() => {
              console.log("Team has been added.");
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

      
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [editedTeam, setEditedTeam] = useState({
      teamId: "",
      name: ""
    });

      const handleEdit = (team) => {
        setSelectedTeam(team);
        setEditedTeam({
            teamId: team.teamId,
          name: team.name
        });
      };
    
      const handleEditField = (field, value) => {
        setEditedTeam({ ...editedTeam, [field]: value });
      };
    
      const handleUpdate = async (event) => {
        event.preventDefault();
        try {
          const teamUpdate = {
            teamId: editedTeam.teamId,
            name: editedTeam.name
          };
          await api.put(`api/Team/updateTeam/${teamUpdate.teamId}`, teamUpdate);
          setTeams(
            teams.map((t) =>
              t.teamId === selectedTeam.teamId ? { ...t, ...teamUpdate } : t
            )
          );
          setSelectedTeam(null);
          setEditedTeam({});
            console.log("User updated successfully");
        } catch (error) {
          console.log("Error updating user");
        }
      };


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
        Create Team
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
                  Create a new team!
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
                <form className="space-y-4" onSubmit={addTeam}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Class Description
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


                  <button
                    type="submit"
                    className="createButton w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add Team
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
        Create Player
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
                <form className="space-y-4" onSubmit={addPlayer}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Class Description
                    </label>
                    <input
                      type="text"
                      name="classDescription"
                      placeholder="Enter className description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={(event) => {
                        setPlayerName(event.target.value)
                      }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Class Description
                    </label>
                    <input
                      type="text"
                      name="classDescription"
                      placeholder="Enter className description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={(event) => {
                        setPlayerNumber(event.target.value)
                      }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Class Description
                    </label>
                    <input
                      type="text"
                      name="classDescription"
                      placeholder="Enter className description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      onChange={(event) => {
                        setPlayerBirthYear(event.target.value)
                      }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Class Description
                    </label>
                    <select
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                required
            >
                <option value="">Select Team</option>
                {teams.map((team) => (
                    <option key={team.teamId} value={team.teamId}>
                        {team.name}
                    </option>
                ))}
            </select>
                  </div>


                  <button
                    type="submit"
                    className="createButton w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add Team
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
               Team id
                </th>
                <th scope="col" class="px-6 py-3">
               Team Name
                </th>
                <th scope="col" class="px-6 py-3">
                Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {teams.map((t) => {
                return(
                 <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {t.teamId}
                    </td>
                    <td class="px-6 py-4">
                        {t.name}
                    </td>
                    <td class="px-6 py-4">
                        <button
                        onClick={() => handleEdit(t)}
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
                Player Name
                </th>
                <th scope="col" class="px-6 py-3">
                Player Number
                </th>
                <th scope="col" class="px-6 py-3">
                Player BirthYear
                </th>
                <th scope="col" class="px-6 py-3">
                Team id
                </th>
                <th scope="col" class="px-6 py-3">
                Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {players.map((p) => {
                return(
                 <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {p.name}
                    </td>
                    <td class="px-6 py-4">
                        {p.number}
                    </td>
                    <td class="px-6 py-4">
                        {p.birthYear}
                    </td>
                    <td class="px-6 py-4">
                        {p.teamId}
                    </td>
                    <td class="px-6 py-4">
                        <button
                         className='p-5 text-blue-500'>Edit</button>
                        <button
                         onClick={() => handleDelete(p.playerId)}
                        className='text-red-500'>Delete</button>
                    </td>
                </tr>
                )
            })}
      
           
        </tbody>
    </table>
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
              <div className="p-4 md:p-5">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Mbrojtja
