import React, { useState, useEffect } from 'react';

function App() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5259/getAllUsers');
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <div>
      <h2>User?</h2>
      <ul>
        {userData.map((user, index) => (
          <li key={index}>
            name: {user.name} username: {user.username} email: {user.email} password: {user.password}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
