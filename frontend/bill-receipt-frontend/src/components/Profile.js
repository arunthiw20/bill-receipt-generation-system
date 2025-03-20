// /src/components/Profile.js
import React, { useEffect, useState } from 'react';
import api from '../api/api.js'; // assuming you're using the api instance for backend calls

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user profile from the backend
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        setUser(response.data.user); // Set user data from response
        console.log("response.data.user in profile js:", response.data.user);
      } catch (error) {
        console.error('Error fetching user profile', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <h3>Profile</h3>
      {user ? (
        <div><br /><br />
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
