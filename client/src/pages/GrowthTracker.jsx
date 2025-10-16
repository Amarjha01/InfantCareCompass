import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import growthTrackerAPI from '../api/growthTrackerAPI';
import { toast } from 'react-hot-toast';
import SkeletonLoader from '../components/SkeletonLoader';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Skeleton Components
const ChartSkeleton = () => (
  <div className="chart-container">
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 animate-pulse">
      <div className="h-6 bg-slate-700 rounded w-1/3 mb-6"></div>
      <div className="h-64 bg-slate-700/50 rounded-lg"></div>
    </div>
  </div>
);

const StatsSkeleton = () => (
  <div className="insight-card">
    <div className="h-6 bg-slate-700 rounded w-1/4 mb-4"></div>
    <div className="stats-grid">
      <div className="stat-item">
        <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-slate-700 rounded w-1/2"></div>
      </div>
      <div className="stat-item">
        <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-slate-700 rounded w-1/2"></div>
      </div>
      <div className="stat-item">
        <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-slate-700 rounded w-1/2"></div>
      </div>
      <div className="stat-item">
        <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-slate-700 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

const GrowthTracker = () => {
  const { user, isAuthenticated } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [growthLogs, setGrowthLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState('line');
  const [showForm, setShowForm] = useState(false);
  const [selectedChild, setSelectedChild] = useState('default');
  const [reminderSettings, setReminderSettings] = useState({
    enabled: true,
    frequency: 'weekly'
  });

  // Form state
  const [formData, setFormData] = useState({
    childId: 'default',
    height_cm: '',
    weight_kg: '',
    milestone: '',
    notes: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });

  // Fetch growth logs on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchGrowthLogs();
      fetchGrowthStats();
    }
  }, [selectedChild, isAuthenticated]);

  const fetchGrowthLogs = async () => {
    try {
      setLoading(true);
      const response = await growthTrackerAPI.getGrowthLogs({
        childId: selectedChild,
        limit: 50,
        sort: 'desc'
      });
      setGrowthLogs(response.data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch growth logs');
    } finally {
      setLoading(false);
    }
  };

  const fetchGrowthStats = async () => {
    try {
      const response = await growthTrackerAPI.getGrowthStats(selectedChild);
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please sign in to add growth entries');
      navigate('/signin');
      return;
    }
    
    if (!formData.height_cm || !formData.weight_kg) {
      toast.error('Height and weight are required');
      return;
    }
    try {
      setLoading(true);
      await growthTrackerAPI.createGrowthLog(formData);
      toast.success('Growth log added successfully!');
      setFormData({
        childId: selectedChild,
        height_cm: '',
        weight_kg: '',
        milestone: '',
        notes: '',
        date: format(new Date(), 'yyyy-MM-dd')
      });
      setShowForm(false);
      fetchGrowthLogs();
      fetchGrowthStats();
    } catch (error) {
      toast.error(error.message || 'Failed to add growth log');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to manage entries');
      navigate('/signin');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await growthTrackerAPI.deleteGrowthLog(id);
        toast.success('Entry deleted successfully!');
        fetchGrowthLogs();
        fetchGrowthStats();
      } catch (error) {
        toast.error(error.message || 'Failed to delete entry');
      }
    }
  };

  const updateReminderSettings = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to update settings');
      navigate('/signin');
      return;
    }
    
    try {
      await growthTrackerAPI.updateReminderSettings({
        childId: selectedChild,
        reminderEnabled: reminderSettings.enabled,
        reminderFrequency: reminderSettings.frequency
      });
      toast.success('Reminder settings updated!');
    } catch (error) {
      toast.error(error.message || 'Failed to update reminder settings');
    }
  };

  // Prepare chart data
  const chartData = {
    labels: growthLogs.map(log => format(new Date(log.date), 'MMM dd')),
    datasets: [
      {
        label: 'Height (cm)',
        data: growthLogs.map(log => log.height_cm),
        borderColor: 'rgb(121, 39, 202)', // Purple gradient colors from hero
        backgroundColor: 'rgba(121, 39, 202, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Weight (kg)',
        data: growthLogs.map(log => log.weight_kg),
        borderColor: 'rgb(245, 194, 255)', // Light pastel pink accent
        backgroundColor: 'rgba(245, 194, 255, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
          color: '#b7fae9',
          font: { size: 14, weight: 'bold' },
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Height (cm)',
          color: '#7948c9',
          font: { size: 14, weight: 'bold' },
        },
        grid: {
          color: 'rgba(121, 39, 202, 0.2)'
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Weight (kg)',
          color: '#f5c2ff',
          font: { size: 14, weight: 'bold' },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#bfafff'
        }
      },
      tooltip: {
        backgroundColor: '#3a005caa',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        cornerRadius: 8,
      }
    }
  };

  // Growth insights
  const getGrowthInsight = () => {
    if (!stats || stats.totalEntries < 2) return null;
    
    const { heightGrowth, weightGrowth, growthRate } = stats;
    
    if (growthRate > 2) {
      return { status: 'excellent', message: 'Excellent growth rate! Your child is growing well above average.' };
    } else if (growthRate > 1) {
      return { status: 'good', message: 'Good growth rate! Your child is growing at a healthy pace.' };
    } else if (growthRate > 0.5) {
      return { status: 'normal', message: 'Normal growth rate. Continue monitoring.' };
    } else {
      return { status: 'concern', message: 'Growth rate is below average. Consider consulting a pediatrician.' };
    }
  };

  const insight = getGrowthInsight();


  // Show authentication prompt if not logged in
if (!isAuthenticated) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black-100 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">
          Welcome!
        </h2>
        <p className="text-gray-700 mb-4">Here's what you'll get:</p>
        <ul className="text-left list-disc list-inside space-y-2 text-blue-600 mb-6">
          <li>📊 Track height and weight over time</li>
          <li>📈 Interactive growth charts</li>
          <li>💡 AI-powered growth insights</li>
          <li>🔔 Customizable reminders</li>
          <li>📋 Milestone tracking</li>
          <li>📱 Multi-child support</li>
        </ul>
        <button
          onClick={() => navigate("/signin")}
          className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
        >
         Login
        </button>
      </div>
    </div>
  );
}



  // if (!isAuthenticated) {
  //   return (
  //     <div className="growth-container">
  //       <h1 className="title">🌱 Growth Tracker</h1>
        
  //       <div className="auth-prompt">
  //         <div className="auth-card">
  //           <h2>🔐 Sign In Required</h2>
  //           <p>To track your child's growth and access all features, please sign in to your account.</p>
            
  //           <div className="auth-buttons">
  //             <button 
  //               className="signin-button"
  //               onClick={() => navigate('/signin')}
  //             >
  //               🔑 Sign In
  //             </button>
  //             <button 
  //               className="register-button"
  //               onClick={() => navigate('/registration')}
  //             >
  //               📝 Create Account
  //             </button>
  //           </div>
            
  //           <div className="feature-preview">
  //             <h3>✨ What you'll get:</h3>
  //             <ul>
  //               <li>📊 Track height and weight over time</li>
  //               <li>📈 Interactive growth charts</li>
  //               <li>💡 AI-powered growth insights</li>
  //               <li>🔔 Customizable reminders</li>
  //               <li>📋 Milestone tracking</li>
  //               <li>📱 Multi-child support</li>
  //             </ul>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="growth-container">
      <h1 className="title">🌱 Growth Tracker</h1>
      
      {/* Welcome Message */}
      <div className="welcome-message">
        <p>👋 Welcome back, {user?.name || 'Parent'}! Ready to track your child's growth journey?</p>
      </div>
      
      {/* Child Selection */}
      <div className="child-selector">
        <label htmlFor="childSelect">👶 Select Child:</label>
        <select
          id="childSelect"
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
        >
          <option value="default">Default Child</option>
          <option value="child1">Child 1</option>
          <option value="child2">Child 2</option>
        </select>
      </div>
      
      {/* Add New Entry Button */}
      <div className="add-entry-section">
        <button
          className="add-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '❌ Cancel' : '➕ Add New Entry'}
        </button>
      </div>

      {/* Add Entry Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="entry-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">📅 Date:</label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="height">📏 Height (cm):</label>
              <input
                type="number"
                id="height"
                step="0.1"
                value={formData.height_cm}
                onChange={(e) => setFormData({...formData, height_cm: e.target.value})}
                placeholder="e.g., 75.5"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="weight">⚖️ Weight (kg):</label>
              <input
                type="number"
                id="weight"
                step="0.1"
                value={formData.weight_kg}
                onChange={(e) => setFormData({...formData, weight_kg: e.target.value})}
                placeholder="e.g., 8.2"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="milestone">🎯 Milestone (optional):</label>
              <input
                type="text"
                id="milestone"
                value={formData.milestone}
                onChange={(e) => setFormData({...formData, milestone: e.target.value})}
                placeholder="e.g., First steps, First words"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="notes">📝 Notes (optional):</label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Additional observations..."
                rows="3"
              />
            </div>
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Saving...' : '💾 Save Entry'}
          </button>
        </form>
      )}

      {/* Growth Insights */}
      {loading ? (
        <StatsSkeleton />
      ) : insight ? (
        <div className={`insight-card ${insight.status}`}>
          <h3>💡 Growth Insight</h3>
          <p>{insight.message}</p>
          {stats && (
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Total Entries:</span>
                <span className="stat-value">{stats.totalEntries}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Height Growth:</span>
                <span className="stat-value">{stats.heightGrowth} cm</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Weight Growth:</span>
                <span className="stat-value">{stats.weightGrowth} kg</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Growth Rate:</span>
                <span className="stat-value">{stats.growthRate} cm/month</span>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Chart Controls */}
      <div className="chart-controls">
        <h3>📊 Growth Visualization</h3>
        <div className="chart-buttons">
          <button
            className={`chart-button ${chartType === 'line' ? 'active' : ''}`}
            onClick={() => setChartType('line')}
          >
            📈 Line Chart
          </button>
          <button
            className={`chart-button ${chartType === 'bar' ? 'active' : ''}`}
            onClick={() => setChartType('bar')}
          >
            📊 Bar Chart
          </button>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="chart-container">
        {loading ? (
          <ChartSkeleton />
        ) : growthLogs.length > 0 ? (
          chartType === 'line' ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <Bar data={chartData} options={chartOptions} />
          )
        ) : (
          <div className="no-data">
            <p>📊 No growth data available yet. Add your first entry to see the chart!</p>
          </div>
        )}
      </div>

      {/* Reminder Settings */}
      <div className="reminder-settings">
        <h3>🔔 Reminder Settings</h3>
        <div className="reminder-controls">
          <label>
            <input
              type="checkbox"
              checked={reminderSettings.enabled}
              onChange={(e) => setReminderSettings({...reminderSettings, enabled: e.target.checked})}
            />
            Enable reminders
          </label>
          <select
            value={reminderSettings.frequency}
            onChange={(e) => setReminderSettings({...reminderSettings, frequency: e.target.value})}
            disabled={!reminderSettings.enabled}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button onClick={updateReminderSettings} className="save-settings">
            💾 Save Settings
          </button>
        </div>
      </div>

      {/* Growth Logs Table */}
      <div className="logs-section">
        <h3>📋 Recent Entries</h3>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : growthLogs.length > 0 ? (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>📅 Date</th>
                  <th>📏 Height (cm)</th>
                  <th>⚖️ Weight (kg)</th>
                  <th>🎯 Milestone</th>
                  <th>📝 Notes</th>
                  <th>⚙️ Actions</th>
                </tr>
              </thead>
              <tbody>
                {growthLogs.map((log) => (
                  <tr key={log._id}>
                    <td>{format(new Date(log.date), 'MMM dd, yyyy')}</td>
                    <td>{log.height_cm}</td>
                    <td>{log.weight_kg}</td>
                    <td>{log.milestone || '-'}</td>
                    <td>{log.notes || '-'}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(log._id)}
                        className="delete-button"
                        title="Delete entry"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data">
            <p>📝 No growth entries yet. Start tracking your child's growth!</p>
          </div>
        )}
      </div>

      {/* Cute decoration */}
      <div className="footer-decoration">🌈👶✨</div>

      <style>{`
        body {
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #22004c, #7927ca 70%);
        }

        /* Container styling */
        .growth-container {
          background: rgba(33, 7, 63, 0.95);
          color: #fff;
          padding: 2.5rem;
          border-radius: 2rem;
          width: 100%;
          max-width: 900px;
          margin: 2.5rem auto;
          box-shadow: 0 12px 48px rgba(42, 0, 50, 0.30);
          position: relative;
        }

        .title {
          text-align: center;
          font-size: 3.2rem;
          font-weight: 700;
          background: linear-gradient(90deg, #ffd6f5, #b7fae9 80%);
          -webkit-background-clip: text;
          color: transparent;
          margin-bottom: 1.5rem;
        }

        .welcome-message p {
          color: #b7fae9;
          font-size: 1.25rem;
          text-align: center;
          margin-bottom: 2rem;
        }

        /* Card-like sections */
        .auth-card, .insight-card, .reminder-settings, .entry-form, .chart-container {
          background: rgba(255,255,255,0.11);
          box-shadow: 0 6px 24px rgba(65, 22, 151, 0.35);
          border-radius: 22px;
          padding: 2rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(14px);
          border: 1.5px solid rgba(255, 255, 255, 0.12);
        }

        .auth-card h2, .insight-card h3, .chart-controls h3, .logs-section h3 {
          font-size: 2.1rem;
          background: linear-gradient(90deg, #f5c2ff 40%, #b2f5ea 80%);
          -webkit-background-clip: text;
          color: transparent;
        }

        .auth-buttons, .chart-buttons {
          display: flex;
          justify-content: center;
          gap: 1.2rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        /* Unified button styling */
        .signin-button, .register-button, .add-button, .save-settings, .chart-button {
          padding: 1rem 2rem;
          font-size: 1.18rem;
          font-weight: 600;
          border-radius: 20px;
          border: none;
          transition: all 0.23s;
          background: linear-gradient(90deg, #9d64e4 10%, #fb87ff 80%);
          color: #fff;
          box-shadow: 0 6px 22px rgba(115, 57, 159, 0.16);
          cursor: pointer;
        }

        .chart-button.active, .register-button {
          background: linear-gradient(90deg, #50fa7b, #69ff94 80%);
          color: #32184c;
        }

        .add-button:hover, .signin-button:hover, .register-button:hover, .chart-button:hover {
          filter: brightness(1.15);
          transform: translateY(-3px) scale(1.03);
        }

        .child-selector {
          gap: 1.1rem;
          justify-content: center;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
        }

        .child-selector select {
          padding: 0.7rem 1rem;
          font-size: 1.03rem;
          border-radius: 12px;
          background: #faf6ff;
          color: #5d2fc6;
          border: 1px solid #e5e5e5;
        }

        /* Form styles */
        .entry-form label { font-weight: 500; color: #ffd6f5; }
        .form-group input, .form-group select, .form-group textarea {
          border-radius: 14px;
          background: #3a005c1a;
          border: none;
          padding: 0.85rem;
          color: #fff;
          font-size: 1.08rem;
          margin-bottom: 0.7rem;
          width: 100%;
          box-sizing: border-box;
        }
        .form-group input::placeholder, .form-group textarea::placeholder {
          color: #d4d4d4;
        }

        /* Chart container enhancements */
        .chart-container {
          background: rgba(255,255,255,0.12);
          border-radius: 22px;
          min-height: 380px;
          margin-bottom: 2.2rem;
          box-shadow: 0 6px 18px rgba(115, 57, 159, 0.13);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Tables and logs */
        .table-wrapper {
          overflow-x: auto;
          border-radius: 18px;
        }
        table {
          width: 100%;
          border-radius: 18px;
          background: #fff;
          color: #32184c;
          font-size: 1.07rem;
          box-shadow: 0 2px 12px rgba(78, 27, 119, 0.09);
          border-collapse: separate;
          border-spacing: 0;
          overflow: hidden;
        }
        th {
          background: #f5c2ff;
          color: #4c2269;
          font-weight: 700;
          border-bottom: 2px solid #ecf2ff;
          padding: 1rem;
          text-align: left;
        }
        td {
          padding: 1rem;
          border-bottom: 1px solid #f3ecfe;
        }
        tr:hover {
          background-color: #f9f2ff;
          transition: background-color 0.3s ease;
        }
        .delete-button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.3rem;
          padding: 0.25rem;
          border-radius: 6px;
          transition: background-color 0.3s ease;
          color: #8a008a;
        }
        .delete-button:hover {
          background-color: rgba(255, 0, 0, 0.15);
        }

        .loading {
          text-align: center;
          padding: 2rem;
          color: #ffd6f5;
          font-size: 1.1rem;
        }

        .footer-decoration {
          text-align: center;
          font-size: 2.1rem;
          margin-top: 1.5rem;
          background: -webkit-linear-gradient(#ff79c6,#50fa7b);
          -webkit-background-clip: text;
          color: transparent;
          animation: bounce 2s infinite;
          user-select: none;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @media (max-width: 900px) {
          .growth-container { padding: 1rem; max-width: 100%; }
          .auth-card, .insight-card, .entry-form, .chart-container { padding: 1rem; }
          .stats-grid { grid-template-columns: 1fr; gap: 0.8rem; }
          table { min-width: 400px; }
          .child-selector { flex-direction: column; gap: 0.75rem; }
          .add-button, .signin-button, .register-button { width: 100%; }
          .form-row { flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export default GrowthTracker;
