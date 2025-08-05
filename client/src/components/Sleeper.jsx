import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

let apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
if (!apiBaseUrl.endsWith('/api')) {
  apiBaseUrl = apiBaseUrl.replace(/\/$/, '') + '/api';
}
const API_BASE_URL = apiBaseUrl;

const Sleeper = () => {
  const userState = useSelector((state) => state.user);
  const currentUser = userState.length > 0 ? userState[userState.length - 1] : null;
  const token = currentUser ? currentUser.token : localStorage.getItem('token');

  const [sleepStart, setSleepStart] = useState('');
  const [sleepEnd, setSleepEnd] = useState('');
  const [notes, setNotes] = useState('');
  const [sleepLogs, setSleepLogs] = useState([]);

  useEffect(() => {
    if (!token) {
      console.log('No token found');
      return;
    }
    
    axios.get(`${API_BASE_URL}/sleeplogs`, { 
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      } 
    })
      .then(response => {
        setSleepLogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching sleep logs:', error);
      });
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sleepStart || !sleepEnd) {
      alert('Please fill in both sleep start and end times');
      return;
    }
    const newLog = {
      sleepStart,
      sleepEnd,
      notes,
    };
    axios.post(`${API_BASE_URL}/sleeplogs`, newLog, { 
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      } 
    })
      .then(response => {
        setSleepLogs([response.data, ...sleepLogs]);
        setSleepStart('');
        setSleepEnd('');
        setNotes('');
      })
      .catch(error => {
        console.error('Error adding sleep log:', error);
      });
  };

  return (
    <div className="sleeper p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Baby Sleeper</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="sleepStart" className="block mb-1 font-medium">Sleep Start:</label>
          <input
            type="datetime-local"
            id="sleepStart"
            value={sleepStart}
            onChange={(e) => setSleepStart(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="sleepEnd" className="block mb-1 font-medium">Sleep End:</label>
          <input
            type="datetime-local"
            id="sleepEnd"
            value={sleepEnd}
            onChange={(e) => setSleepEnd(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="notes" className="block mb-1 font-medium">Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows="3"
            placeholder="Optional notes"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Sleep Log
        </button>
      </form>

      {sleepLogs.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Sleep Logs</h3>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {sleepLogs.map((log) => (
              <li key={log._id} className="border border-gray-200 rounded p-2">
                <div><strong>Start:</strong> {new Date(log.sleepStart).toLocaleString()}</div>
                <div><strong>End:</strong> {new Date(log.sleepEnd).toLocaleString()}</div>
                {log.notes && <div><strong>Notes:</strong> {log.notes}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sleeper;
