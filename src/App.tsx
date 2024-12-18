import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaHome, FaGift } from 'react-icons/fa'; // Import stylish icons
import HomePage from './components/HomePage';
import RewardPage from './components/RewardPage';
import SplashScreen from './components/SplashScreen'; // Import SplashScreen component

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false); // Hide splash screen after 3 seconds
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col justify-between">
        {showSplash ? (
          <SplashScreen />
        ) : (
          <>
            <header className="py-4 bg-gray-900 text-white text-center font-bold text-xl"></header>
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/rewards" element={<RewardPage />} />
              </Routes>
            </main>
            <footer className="bg-gray-900 text-white py-4 flex justify-center gap-8">
              <Link
                to="/home"
                className="flex flex-col items-center hover:text-yellow-300"
              >
                <FaHome size={24} />
                <span className="text-sm mt-2">Home</span>
              </Link>
              <Link
                to="/rewards"
                className="flex flex-col items-center hover:text-yellow-300"
              >
                <FaGift size={24} />
                <span className="text-sm mt-2">Rewards</span>
              </Link>
            </footer>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
