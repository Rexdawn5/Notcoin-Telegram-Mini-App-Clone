import React, { useState, useEffect } from 'react';
import TonLogo from '../assets/ton.png'; // Path to the 'ton.png' image in the assets folder

const generateRandomUser = () => {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'George', 'Hannah', 'Ivy', 'Jack']; 
  const amount = Math.floor(Math.random() * 135 + 15); 
  return { name: names[Math.floor(Math.random() * names.length)], amount };
};

const RewardPage: React.FC = () => {
  const [winners, setWinners] = useState<{ name: string; amount: number }[]>([]);
  const [showInput, setShowInput] = useState(false); 
  const [tonAddress, setTonAddress] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    const interval = setInterval(() => {
      setWinners((prev) => [generateRandomUser(), ...prev].slice(0, 10)); 
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleToggleInput = () => {
    setShowInput((prev) => !prev);
  };

  const handleWithdraw = () => {
    if (tonAddress.trim() === '') {
      setErrorMessage('Please enter a valid TON address.');
    } else {
      alert(`Withdrawing 15 TON to: ${tonAddress}`);
      setErrorMessage(''); 
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">TON Rewards</h1>

      {/* Withdraw Section */}
      <div className="w-full max-w-md p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-4">Withdraw Your Tokens</h2>
        <button
          onClick={handleToggleInput}
          className={`w-full bg-blue-500 text-white px-4 py-2 rounded transition-all duration-300 ${
            showInput ? 'bg-blue-700' : 'hover:bg-blue-700'
          }`}
        >
          {showInput ? 'Close TON Address' : 'Enter TON Address'}
        </button>

        {/* Expandable Input Section */}
        {showInput && (
          <div className="mt-4 transition-all duration-300">
            <input
              type="text"
              placeholder="Enter your TON address"
              value={tonAddress}
              onChange={(e) => setTonAddress(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleWithdraw}
              disabled={!tonAddress.trim()}
              className={`w-full mt-2 px-4 py-2 rounded text-white transition-all ${
                tonAddress.trim()
                  ? 'bg-blue-500 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Withdraw 15 TON
            </button>
            {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>} 
          </div>
        )}
      </div>

      {/* Winners Section */}
      <div className="w-full max-w-md mt-6">
        <h2 className="text-xl font-bold mb-4">Recent Winners</h2>
        <div className="w-full h-60 p-4 bg-black border rounded shadow-lg overflow-y-auto flex flex-col space-y-2 glow-box">
          {winners.map((winner, index) => (
            <div key={index} className="flex items-center p-2 text-center bg-gray-800 text-white rounded-lg shadow-md glow-text">
              <img
                src={TonLogo} // Updated path
                alt="TON Logo"
                className="w-6 h-6 mr-2"
              />
              {winner.name} won {winner.amount} TON
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardPage;
