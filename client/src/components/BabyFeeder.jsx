import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

let apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
if (!apiBaseUrl.endsWith('/api')) {
  apiBaseUrl = apiBaseUrl.replace(/\/$/, '') + '/api';
}
const API_BASE_URL = apiBaseUrl;

const BabyFeeder = () => {
  const userState = useSelector((state) => state.user);
  const currentUser = userState.length > 0 ? userState[userState.length - 1] : null;
  const token = currentUser ? currentUser.token : localStorage.getItem('token');

  const [feedingTime, setFeedingTime] = useState('');
  const [amount, setAmount] = useState('');
  const [feedingType, setFeedingType] = useState('bottle');
  const [feedings, setFeedings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      console.log('No token found');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    axios.get(`${API_BASE_URL}/feedlogs`, { 
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      } 
    })
      .then(response => {
        setFeedings(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching feed logs:', error);
        setError('Failed to load feed logs. Please check your connection.');
        setLoading(false);
      });
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedingTime || !amount) {
      alert('Please fill in all fields');
      return;
    }
    
    if (!token) {
      alert('Please login first');
      return;
    }

    const newFeeding = {
      feedingTime,
      amount: parseInt(amount),
      feedingType,
    };
    
    setLoading(true);
    
    axios.post(`${API_BASE_URL}/feedlogs`, newFeeding, { 
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      } 
    })
      .then(response => {
        setFeedings([response.data, ...feedings]);
        setFeedingTime('');
        setAmount('');
        setFeedingType('bottle');
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        console.error('Error adding feed log:', error);
        setError('Failed to add feed log. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div className="baby-feeder p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Baby Feeder</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="feedingTime" className="block mb-1 font-medium">Feeding Time:</label>
          <input
            type="datetime-local"
            id="feedingTime"
            value={feedingTime}
            onChange={(e) => setFeedingTime(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="amount" className="block mb-1 font-medium">Amount (ml):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            min="1"
            required
          />
        </div>
        <div>
          <label htmlFor="feedingType" className="block mb-1 font-medium">Feeding Type:</label>
          <select
            id="feedingType"
            value={feedingType}
            onChange={(e) => setFeedingType(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="bottle">Bottle</option>
            <option value="breastfeed">Breastfeed</option>
            <option value="solid">Solid Food</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Feeding
        </button>
      </form>

      {feedings.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Feeding Log</h3>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {feedings.map((feed) => (
              <li key={feed._id} className="border border-gray-200 rounded p-2">
                <div><strong>Time:</strong> {new Date(feed.feedingTime).toLocaleString()}</div>
                <div><strong>Amount:</strong> {feed.amount} ml</div>
                <div><strong>Type:</strong> {feed.feedingType}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BabyFeeder;
