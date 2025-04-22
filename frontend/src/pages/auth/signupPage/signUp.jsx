import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './signUp.css';
import tileImagge from '../../../assets/images/Logo.png'

function SignUpForm() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {  // <-- Figyeld meg az `async` kulcsszót itt!
        e.preventDefault();
        
        if (password !== confirmPassword) {
          setError("A jelszavak nem egyeznek!");
          return;
        }
      
        try {
          // Await használata async függvényben
          const response = await axios.post('http://localhost:3000/users/register', {
            userName: username,
            userEmail: email,
            userPassword: password
          });
      
          // Sikeres regisztráció utáni átirányítás
          navigate('/signin'); 
        } catch (err) {
          setError(err.response?.data?.message || 'Regisztráció sikertelen');
        }
      };

    return (
        <>
            <form class="form" onSubmit={handleSubmit}>
                <img className='tileimages' src={tileImagge} alt="" />
                <p class="title">Sign Up</p>
                <p class="message">Join now and tune into the beats the world is sharing.</p>

                {error && <p className="error-message">{error}</p>}

                <label className='signuplabel'>
                    <input className="signupinput" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <span>Username</span>
                </label>

                <label className='signuplabel'>
                    <input className="signupinput" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <span>Email</span>
                </label>

                <label className='signuplabel'>
                    <input className="signupinput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <span>Password</span>
                </label>

                <label className='signuplabel'>
                    <input className="signupinput" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <span>Confirm password</span>
                </label>

                <button type='submit' class="submit">Submit</button>

                <p class="signin">Already have an acount? <Link className='toSignIn' to="/signin">Sign In</Link> </p>
            </form>
        </>
    )
}

export default SignUpForm