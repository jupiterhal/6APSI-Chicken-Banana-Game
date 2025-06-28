import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      navigate('/landing');
    }
  };

  return (
    <div id = "divider">
      <h1 id = "loginpage">Login Page</h1>
      <form id = "form" onSubmit={handleSubmit}>
        <div id = "divider2">
          <label id = "username">Username:</label>
          <input id = "usernameinput"
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div id = "divider3">
          <label id = "password">Password:</label>
          <input id = "passwordinput"
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id = "login" type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;