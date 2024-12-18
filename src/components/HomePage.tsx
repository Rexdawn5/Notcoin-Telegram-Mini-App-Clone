import React, { useState, useEffect } from 'react';
import rocketT from '../assets/rocketT.png'; // Path to the Rocket T image
import tonLogo from '../assets/ton.png';    // Path to the TON logo

// Extend the global Window interface to include Telegram
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initDataUnsafe: {
          user?: {
            username?: string;
          };
        };
      };
    };
  }
}

const rewards = [
  { cost: '0.5 TON', reward: '1 TON' },
  { cost: '1 TON', reward: '2 TON' },
  { cost: '2 TON', reward: '5 TON' },
  { cost: '5 TON', reward: '10 TON' },
];

const HomePage: React.FC = () => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [isRewardsExpanded, setIsRewardsExpanded] = useState<boolean>(false);
  const [isInviteExpanded, setIsInviteExpanded] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  // Fetch Telegram username
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      if (user && user.username) {
        setUsername(user.username);
      } else {
        setUsername('Guest'); // Default if no username is provided
      }
    } else {
      setUsername('Guest');
    }
  }, []);

  const handleButtonClick = (index: number) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 200); // Remove glow after 200ms
  };

  const toggleRewardsExpand = () => {
    setIsRewardsExpanded((prev) => !prev);
  };

  const toggleInviteExpand = () => {
    setIsInviteExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Display Telegram Username */}
      <div className="w-full text-center p-4 text-blue-500 text-lg font-semibold">
        {username ? `Welcome, @${username}` : 'Loading...'}
      </div>

      {/* Centered Image */}
      <img
        src={rocketT}
        alt="Rocket T"
        className="w-1/2 md:w-1/3 mb-8"
      />

      {/* White Box for Tokens Earned */}
      <div className="w-3/4 md:w-1/2 p-6 mb-8 bg-white rounded-lg shadow-md text-center border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Tokens Earned</h2>
        <div className="flex items-center justify-center gap-2">
          <p className="text-3xl font-bold text-indigo-700">2 TON</p>
          <img
            src={tonLogo}
            alt="TON Logo"
            className="w-8 h-8"
          />
        </div>
      </div>

      {/* Rewards Section */}
      <div className="w-3/4 md:w-1/2 p-4 mb-4 border rounded-lg shadow-lg bg-white">
        {/* Expand/Collapse Button */}
        <button
          onClick={toggleRewardsExpand}
          className="w-full text-left text-xl font-bold text-indigo-700 mb-2 focus:outline-none"
        >
          {isRewardsExpanded ? 'Hide Rewards ▼' : 'Earn Rewards ▶'}
        </button>

        {/* Expandable Rewards Section */}
        {isRewardsExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 transition-all duration-300">
            {rewards.map((reward, index) => (
              <div key={index} className="p-4 border rounded shadow text-lg font-semibold transition">
                {reward.cost === '0.5 TON' ? (
                  <a
                    href="https://t.me/send?start=IVN4oVhcpnVO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 text-center bg-indigo-700 text-white rounded hover:bg-indigo-800"
                  >
                    Pay: {reward.cost} <br /> Receive: {reward.reward}
                  </a>
                ) : reward.cost === '1 TON' ? (
                  <a
                    href="https://t.me/send?start=IVkg2FgQVuPR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 text-center bg-indigo-700 text-white rounded hover:bg-indigo-800"
                  >
                    Pay: {reward.cost} <br /> Receive: {reward.reward}
                  </a>
                ) : reward.cost === '2 TON' ? (
                  <a
                    href="https://t.me/send?start=IVAkTJQYCFVb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 text-center bg-indigo-700 text-white rounded hover:bg-indigo-800"
                  >
                    Pay: {reward.cost} <br /> Receive: {reward.reward}
                  </a>
                ) : reward.cost === '5 TON' ? (
                  <a
                    href="https://t.me/send?start=IVnVGwPy7NyV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 text-center bg-indigo-700 text-white rounded hover:bg-indigo-800"
                  >
                    Pay: {reward.cost} <br /> Receive: {reward.reward}
                  </a>
                ) : (
                  <button
                    onClick={() => handleButtonClick(index)}
                    className={`w-full h-full p-4 border rounded shadow text-lg font-semibold transition 
                      ${clickedIndex === index ? 'ring-4 ring-indigo-400' : 'hover:bg-indigo-100'}`}
                  >
                    Pay: {reward.cost} <br /> Receive: {reward.reward}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invite Friends Section */}
      <div className="w-3/4 md:w-1/2 p-4 mb-4 border rounded-lg shadow-lg bg-white">
        {/* Expand/Collapse Button */}
        <button
          onClick={toggleInviteExpand}
          className="w-full text-left text-xl font-bold text-indigo-700 mb-2 focus:outline-none"
        >
          {isInviteExpanded ? 'Hide Invite Friends ▼' : 'Invite Friends ▶'}
        </button>

        {/* Expandable Invite Friends Section */}
        {isInviteExpanded && (
          <div className="mt-2 transition-all duration-300 text-center">
            <p className="text-lg font-semibold text-gray-700 mb-4">
              Invite your friends and earn rewards!
            </p>
            <input
              type="text"
              placeholder="Your invite link"
              value="https://example.com/invite/your-link"
              readOnly
              className="w-full p-2 mb-4 border border-gray-300 rounded text-gray-600 text-center"
            />
            <button
              className="p-2 bg-indigo-700 text-white rounded hover:bg-indigo-800 transition"
            >
              Copy Invite Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
