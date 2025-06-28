import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <h1 id = "landingpage">Landing Page</h1>
      <p id = "greeting">Greetings!. This is the landing page.</p>
      <button id = "button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LandingPage;
