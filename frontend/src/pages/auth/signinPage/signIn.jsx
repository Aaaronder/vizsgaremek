import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './signIn.css';
import tileImagge from '../../../assets/images/Logo.png';

function SignInForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/users/login', {
                userEmail: formData.email,
                userPassword: formData.password
            });

            // Sikeres bejelentkezés után
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({
                userId: response.data.userId,
                userName: response.data.userName
            }));

            navigate('/browse');
        } catch (err) {
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