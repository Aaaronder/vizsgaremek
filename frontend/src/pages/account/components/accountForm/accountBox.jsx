import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import './accountBox.css';
import { UserContext } from '../../../../context/UserContext';

const Account = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({
    userName: '',
    userEmail: '',
    userCreated: '',
    songCount: 0
  });
  const [error, setError] = useState('');

  // Feltöltés idejének formázása
  const formatUploadTime = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), {
        addSuffix: true,
        locale: enUS
      });
    } catch (error) {
      console.error("Dátum formázási hiba:", error);
      return timestamp;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.userId) {
        setError('Nincs bejelentkezett felhasználó');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Nincs érvényes token');
          return;
        }

        // Felhasználói adatok lekérése
        const userResponse = await axios.get('http://localhost:3000/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Feltöltött dalok számának lekérése
        const songsResponse = await axios.get('http://localhost:3000/users/me/songs', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUserData({
          userName: userResponse.data.userName,
          userEmail: userResponse.data.userEmail,
          userCreated: userResponse.data.userCreated,
          songCount: songsResponse.data.songCount
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Hiba az adatok lekérése közben');
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <>
      <div className="accountInfoContainer">
        <div className="accinfo">
          <h2 className='accInfoh2'>Account Information</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="personal">
            <div className="personalInfo">
              <div className="pinfo1">
                <h3>Username:</h3>
              </div>
              <div className="pinfo2">
                <h3>{user.userName || 'N/A'}</h3>
              </div>
            </div>

            <div className="personalInfo">
              <div className="pinfo1">
                <h3>Email:</h3>
              </div>
              <div className="pinfo2">
                <h3>{userData.userEmail || 'N/A'}</h3>
              </div>
            </div>

            <div className="personalInfo">
              <div className="pinfo1">
                <h3>Account created:</h3>
              </div>
              <div className="pinfo2">
                <h3>{userData.userCreated ? formatUploadTime(userData.userCreated) : 'N/A'}</h3>
              </div>
            </div>

            <div className="personalInfo">
              <div className="pinfo1">
                <h3>Songs uploaded:</h3>
              </div>
              <div className="pinfo2">
                <h3>{userData.songCount}</h3>
              </div>
            </div>
          </div>
          <div className="editbuttondiv">
            <button className='editPersonalInfo'>Edit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;