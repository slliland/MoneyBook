// src/containers/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username) {
      login(username);
      navigate('/');  // Redirect to Home after login
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Enter username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
