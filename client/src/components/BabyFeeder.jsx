import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Baby, Clock, Droplet } from 'lucide-react';

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
    if (!token) return;

    setLoading(true);
    setError(null);

    axios
      .get(`${API_BASE_URL}/feedlogs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setFeedings(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load feed logs. Please check your connection.');
        setLoading(false);
      });
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedingTime || !amount) return alert('Please fill in all fields');

    if (!token) return alert('Please login first');

    const newFeeding = {
      feedingTime,
      amount: parseInt(amount),
      feedingType,
    };

    setLoading(true);

    axios
      .post(`${API_BASE_URL}/feedlogs`, newFeeding, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setFeedings([response.data, ...feedings]);
        setFeedingTime('');
        setAmount('');
        setFeedingType('bottle');
        setLoading(false);
        setError(null);
      })
      .catch(() => {
        setError('Failed to add feed log. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div className="p-6 m-10 mt-20 max-w-lg mx-auto bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg transition-colors duration-300">
      <h2 className="flex items-center gap-2 text-2xl font-bold mb-6 text-blue-700">
        <Baby className="w-6 h-6" /> Baby Feeder
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-xl shadow">
        <div>
          <label htmlFor="feedingTime" className="block mb-1 font-medium text-gray-700">
            Feeding Time
          </label>
          <input
            type="datetime-local"
            id="feedingTime"
            value={feedingTime}
            onChange={(e) => setFeedingTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block mb-1 font-medium text-gray-700">
            Amount (ml)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            min="1"
          />
        </div>

        <div>
          <label htmlFor="feedingType" className="block mb-1 font-medium text-gray-700">
            Feeding Type
          </label>
          <select
            id="feedingType"
            value={feedingType}
            onChange={(e) => setFeedingType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="bottle">Bottle</option>
            <option value="breastfeed">Breastfeed</option>
            <option value="solid">Solid Food</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Add Feeding'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Feeding Log</h3>
        {feedings.length === 0 ? (
          <p className="text-gray-500">No feedings logged yet. Add your first one above!</p>
        ) : (
          <ul className="space-y-3 max-h-60 overflow-y-auto">
            <AnimatePresence>
              {feedings.map((feed) => (
                <motion.li
                  key={feed._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <Clock className="w-4 h-4" />
                      {new Date(feed.feedingTime).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <Droplet className="w-4 h-4" />
                      {feed.amount} ml ({feed.feedingType})
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
};

export default BabyFeeder;
