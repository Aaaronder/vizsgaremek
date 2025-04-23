/*import React, { useState } from 'react';
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

export default SignUpForm*/

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
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.username || !formData.email || !formData.password) {
            setError('Minden mező kitöltése kötelező');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('A jelszavak nem egyeznek');
            return false;
        }

        if (formData.password.length < 6) {
            setError('A jelszónak legalább 6 karakter hosszúnak kell lennie');
            return false;
        }

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            setError('Érvénytelen email cím');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
  
      if (formData.password !== formData.confirmPassword) {
          setError("A jelszavak nem egyeznek!");
          return;
      }
  
      if (!validateForm()) return;
  
      setIsLoading(true);
  
      try {
          const response = await axios.post('http://localhost:3000/users/register', {
              userName: formData.username, // formData-ból vesszük az értéket
              userEmail: formData.email,
              userPassword: formData.password
          });
  
          if (response.data.success) {
              navigate('/signin');
          }
      } catch (err) {
          setError(err.response?.data?.message || 'Regisztráció sikertelen');
      } finally {
          setIsLoading(false);
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

                <button type='submit' className="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>

                <p className="signin">Already have an account? <Link className='toSignIn' to="/signin">Sign In</Link></p>
            </form>
        </div>
    );
}

export default SignUpForm;