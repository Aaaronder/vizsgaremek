import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AccountBox.css';

function AccountBox() {
    const [userData, setUserData] = useState(null);
    const [songsCount, setSongsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const timeSince = (dateString) => {
        const now = new Date();
        const created = new Date(dateString);
        const diff = now - created;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        return `${days} napja`;
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('Nincs token a localStorage-ban');
            navigate('/signin');
            return;
        }

        const fetchData = async () => {
            try {
                const userResponse = await axios.get('http://localhost:3000/users/currentuser', {
                    headers: { 
                        'Authorization': `Bearer ${token}`
                    }
                });

                setUserData(userResponse.data);
                console.log('API válasz adat:', userResponse.data);

                if (!userResponse.data) {
                    throw new Error('Üres API válasz: Nincs adat');
                }
                if (!userResponse.data.userId) {
                    console.error('API válasz nem tartalmaz userId mezőt:', userResponse.data);
                    throw new Error('Érvénytelen felhasználói adatok');
                }
            } catch (error) {
                if (error.response) {
                    console.error('API hiba:', {
                        message: error.message,
                        response: error.response.data,
                        status: error.response.status
                    });
                    if (error.response.status === 401) {
                        console.error('Érvénytelen vagy lejárt token');
                    }
                } else {
                    console.error('Hiba:', error.message);
                }
                localStorage.removeItem('token');
                navigate('/signin');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="infoContainer">
            <div className="headerRow">
                <p className='accInfo'>Account Informations</p>
                <button
                    className='editButton'
                    onClick={() => navigate('/account/edit')}
                >
                    Edit
                </button>
            </div>

            <div className="infoBlock">
                <p className='upperInfo'>Username:</p>
                <p className='lowerInfo'>{userData.userName}</p>
            </div>

            <div className="infoBlock">
                <p className='upperInfo'>Email:</p>
                <p className='lowerInfo'>{userData.userEmail}</p>
            </div>

            <div className="infoBlock">
                <p className='upperInfo'>Account Created:</p>
                <p className='lowerInfo'>
                    {formatDate(userData.userCreated)} ({timeSince(userData.userCreated)})
                </p>
            </div>

            <div className="infoBlock">
                <p className="upperInfo">Songs Uploaded:</p>
                <p className="lowerInfo">{songsCount}</p>
            </div>
        </div>
    );
}

export default AccountBox;