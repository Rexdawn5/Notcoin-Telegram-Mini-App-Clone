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
  const [username, setUsername] = useState<string | null>(null);
  const [isRewardsExpanded, setIsRewardsExpanded] = useState(false);
  const [isInviteExpanded, setIsInviteExpanded] = useState(false);

  const inviteLink = "https://t.me/JinglejetBot/myapp";

  // Fetch Telegram username
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      if (user?.username) {
        setUsername(user.username);
      } else {
        setUsername('Guest');
      }
    } else {
      console.warn('Telegram WebApp is not available');
      setUsername('Guest');
    }
  }, []);

  const toggleRewardsExpand = () => setIsRewardsExpanded((prev) => !prev);
  const toggleInviteExpand = () => setIsInviteExpanded((prev) => !prev);

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    alert('Invite link copied to clipboard!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Display Telegram Username */}
      <div className="w-full text-center p-4 text-blue-500 text-lg font-semibold">
        {username === null ? 'Checking...' : `Welcome, @${username}`}
      </div>

      {/* Centered Image */}
      <img src={rocketT} alt="Rocket T" className="w-1/2 md:w-1/3 mb-8" />

      {/* White Box for Tokens Earned */}
      <div className="w-3/4 md:w-1/2 p-6 mb-8 bg-white rounded-lg shadow-md text-center border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Tokens Earned</h2>
        <div className="flex items-center justify-center gap-2">
          <p className="text-3xl font-bold text-indigo-700">2 TON</p>
          <img src={tonLogo} alt="TON Logo" className="w-8 h-8" />
        </div>
      </div>

      {/* Rewards Section */}
      <div className="w-3/4 md:w-1/2 p-4 mb-4 border rounded-lg shadow-lg bg-white">
        <button
          onClick={toggleRewardsExpand}
          className="w-full text-left text-xl font-bold text-indigo-700 mb-2 focus:outline-none"
        >
          {isRewardsExpanded ? 'Hide Rewards ▼' : 'Earn Rewards ▶'}
        </button>
        {isRewardsExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {rewards.map((reward, index) => (
              <a
                key={index}
                href={`https://t.me/send?start=${index}`} // Update with actual links
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 text-center bg-indigo-700 text-white rounded hover:bg-indigo-800"
              >
                Pay: {reward.cost} <br /> Receive: {reward.reward}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Invite Friends Section */}
      <div className="w-3/4 md:w-1/2 p-4 mb-4 border rounded-lg shadow-lg bg-white">
        <button
          onClick={toggleInviteExpand}
          className="w-full text-left text-xl font-bold text-indigo-700 mb-2 focus:outline-none"
        >
          {isInviteExpanded ? 'Hide Invite Friends ▼' : 'Invite Friends ▶'}
        </button>
        {isInviteExpanded && (
          <div className="mt-2 text-center">
            <p className="text-lg font-semibold text-gray-700 mb-4">
              Invite your friends and earn rewards!
            </p>
            <button
              onClick={copyInviteLink}
              className="p-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
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
