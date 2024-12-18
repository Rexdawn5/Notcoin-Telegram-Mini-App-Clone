import React from 'react';
import './SplashScreen.css';
import logo from '../assets/launch.png'; // Path to your logo

const SplashScreen: React.FC = () => {
  return (
    <div className="splash-screen">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default SplashScreen;
