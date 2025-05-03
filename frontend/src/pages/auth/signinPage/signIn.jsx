import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './signIn.css';
import tileImagge from '../../../assets/images/Logo.png';
import { UserContext } from '../../../context/UserContext';

function SignInForm() {

    // Állapotok kezelése
    const [formData, setFormData] = useState({
        email: '',
        password: '' 
    });
    const [error, setError] = useState('');          
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);   

    // Input mezők változásának kezelése
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Űrlap elküldése
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {

            // Bejelentkezés kérés küldése
            const response = await axios.post('http://localhost:3000/users/login', {
                userEmail: formData.email,
                userPassword: formData.password
            });

            // Sikeres bejelentkezés esetén:
            // Token mentése localStorage-ba
            localStorage.setItem('token', response.data.token);
            
            // Felhasználói adatok összeállítása
            const userData = {
                userId: response.data.userId,
                userName: response.data.userName,
                isAdmin: response.data.isAdmin
            };
            
            // Felhasználói adatok elmentése
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);  // Kontextus frissítése

            // Átirányítás
            navigate('/browse');
        } catch (err) {
            // Hiba esetén hibaüzenet
            setError(err.response?.data?.message || 'Bejelentkezés sikertelen');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <img className='tileimagez' src={tileImagge} alt="" />
                <p className="title">Sign In</p>
                <p className="message">Welcome back ~ time to tune in again.</p>

                {error && <p className="error-message">{error}</p>}

                <label className='signinlabel'>
                    <input
                        className="signininput"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <span>Email</span>
                </label>

                <label className='signinlabel'>
                    <input
                        className="signininput"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <span>Password</span>
                </label>

                <button type='submit' className="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>

                <p className="signin">Don't have an account? <Link className='toSignIn' to="/signup">Sign Up</Link></p>
            </form>
        </div>
    );
}

export default SignInForm;