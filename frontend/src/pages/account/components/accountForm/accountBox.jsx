import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../../context/UserContext';
import './accountBox.css';

const Account = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({ userName: '', userEmail: '' });
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
        setFormData({
          userName: response.data.userName,
          userEmail: response.data.userEmail,
        });
      } catch (err) {
        setError('Hiba az adatok lekérésekor: ' + err.message);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:3000/users/me',
        {
          userName: formData.userName,
          userEmail: formData.userEmail,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Adatok sikeresen frissítve!');
      setError('');
      // Frissítjük a UserContext-et
      const updatedUser = { ...user, userName: formData.userName, userEmail: formData.userEmail };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      setError('Hiba a frissítéskor: ' + err.response?.data?.message || err.message);
      setSuccess('');
    }
  };

  if (!userData) return <div>Betöltés...</div>;

  return (
    <div className="account-container">
      <h2>Fiók adatok</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <div className="user-info">
        <p><strong>Felhasználónév:</strong> {userData.userName}</p>
        <p><strong>Email:</strong> {userData.userEmail}</p>
        <p><strong>Fiók létrehozva:</strong> {new Date(userData.userCreated).toLocaleDateString()}</p>
        <p><strong>Feltöltött zenék száma:</strong> {userData.uploadedSongs}</p>
      </div>
      <h3>Adatok módosítása</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Felhasználónév:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Mentés</button>
      </form>
    </div>
  );
};

export default Account;