import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AccountBox.css'; // Ha van stílusfájl

function AccountBox() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Adatok lekérése
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Nincs token');
            
            const response = await axios.get('http://localhost:3000/users/currentuser', {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.data) throw new Error('Nem érkeztek adatok');
            setUserData(response.data);
        } catch (error) {
            console.error('Hiba az adatok lekérésében:', error);
            setError(error.response?.data?.message || error.message);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/signin');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [navigate]);

    if (loading) return <div className="loading-spinner">Betöltés...</div>;
    if (error) return <div className="error-message">Hiba: {error}</div>;

    return (
        <div className="account-box">
            <h2 className="account-title">Profilom</h2>
            {userData && (
                <div className="account-details">
                    <div className="detail-row">
                        <span className="detail-label">Név:</span>
                        <span className="detail-value">{userData.userName}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">{userData.userEmail}</span>
                    </div>
                    
                    <button 
                        className="edit-button"
                        onClick={() => navigate('/account/edit')}
                    >
                        Profil szerkesztése
                    </button>
                </div>
            )}
        </div>
    );
}

export default AccountBox;