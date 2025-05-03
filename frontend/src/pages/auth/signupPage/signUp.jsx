import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './signUp.css';
import tileImagge from '../../../assets/images/Logo.png';

function SignUpForm() {
    const [formData, setFormData] = useState({
        username: '',         
        email: '',             
        password: '',         
        confirmPassword: '' 
    });
    const [error, setError] = useState(''); 
    const navigate = useNavigate();         

    // Input mezők változásának kezelése
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Űrlap validálása
    const validateForm = () => {

        // Kötelező mezők ellenőrzése
        if (!formData.username || !formData.email || !formData.password) {
            setError('Minden mező kitöltése kötelező');
            return false;
        }

        // Jelszók egyezésének ellenőrzése
        if (formData.password !== formData.confirmPassword) {
            setError('A jelszavak nem egyeznek');
            return false;
        }

        // Jelszó hossz ellenőrzése
        if (formData.password.length < 6) {
            setError('A jelszónak legalább 6 karakter hosszúnak kell lennie');
            return false;
        }

        // Email formátum ellenőrzése
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            setError('Érvénytelen email cím');
            return false;
        }

        return true;
    };

    // Űrlap elküldése
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        // Jelszó egyezés ellenőrzése
        if (formData.password !== formData.confirmPassword) {
            setError("A jelszavak nem egyeznek!");
            return;
        }
    
        // Űrlap validálása
        if (!validateForm()) return;

        // Regisztráció kérés küldése
        try {
            const response = await axios.post('http://localhost:3000/users/register', {
                userName: formData.username,
                userEmail: formData.email,
                userPassword: formData.password
            });
    
            // Sikeres regisztráció esetén átirányítás
            if (response.data.success) {
                navigate('/');
            }
        } catch (err) {
            // Hiba kezelése
            setError(err.response?.data?.message || 'Regisztráció sikertelen');
        }
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <img className='tileimages' src={tileImagge} alt="" />
                <p className="title">Sign Up</p>
                <p className="message">Join now and tune into the beats the world is sharing.</p>

                {error && <p className="error-message">{error}</p>}

                <label className='signuplabel'>
                    <input 
                        className="signupinput" 
                        type="text" 
                        name="username"
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                    <span>Username</span>
                </label>

                <label className='signuplabel'>
                    <input 
                        className="signupinput" 
                        type="email" 
                        name="email"
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <span>Email</span>
                </label>

                <label className='signuplabel'>
                    <input 
                        className="signupinput" 
                        type="password" 
                        name="password"
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <span>Password</span>
                </label>

                <label className='signuplabel'>
                    <input 
                        className="signupinput" 
                        type="password" 
                        name="confirmPassword"
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        required 
                    />
                    <span>Confirm password</span>
                </label>

                <button type='submit' className="submit">
                    Submit
                </button>

                <p className="signin">Already have an account? <Link className='toSignIn' to="/">Sign In</Link></p>
            </form>
        </div>
    );
}

export default SignUpForm;