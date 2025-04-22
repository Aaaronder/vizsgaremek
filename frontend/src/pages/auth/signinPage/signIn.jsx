import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './signIn.css';

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

export default SignInForm