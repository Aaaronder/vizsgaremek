/*import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './signIn.css';
import tileImagge from '../../../assets/images/Logo.png'

function SignInForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {  // <-- async függvény
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        userEmail: email,
        userPassword: password
      });

      localStorage.setItem('token', response.data.token);

      navigate('/');

    } catch (err) {
      setError('Bejelentkezés sikertelen');
    }
  };

  return (
    <>
      <form class="form" onSubmit={handleSubmit}>
        <img className='tileimagez' src={tileImagge} alt="" />
        <p class="title">Sign In</p>
        <p class="message">Welcome back ~ time to tune in again.</p>

        {error && <p className="error-message">{error}</p>}

        <label className='signinlabel'>
          <input class="signininput" value={email} type="email" placeholder="" onChange={(e) => setEmail(e.target.value)} required />
          <span>Email</span>
        </label>

        <label className='signinlabel'>
          <input className="signininput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <span>Password</span>
        </label>

        <button type='submit' class="submit">Submit</button>

        <p class="signin">Don't have an account? <Link className='toSignIn' to="/signup">Sign Up</Link> </p>
      </form>
    </>
  )
}

export default SignInForm*/

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

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({
                userName: response.data.userName,
                isAdmin: response.data.isAdmin
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