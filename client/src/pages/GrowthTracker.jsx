import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
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
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Weight (kg)',
        data: growthLogs.map(log => log.weight_kg),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
          text: 'Date'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Height (cm)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Weight (kg)'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
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
      <div className="growth-container">
        <h1 className="title">🌱 Growth Tracker</h1>
        
        <div className="auth-prompt">
          <div className="auth-card">
            <h2>🔐 Sign In Required</h2>
            <p>To track your child's growth and access all features, please sign in to your account.</p>
            
            <div className="auth-buttons">
              <button 
                className="signin-button"
                onClick={() => navigate('/signin')}
              >
                🔑 Sign In
              </button>
              <button 
                className="register-button"
                onClick={() => navigate('/registration')}
              >
                📝 Create Account
              </button>
            </div>
            
            <div className="feature-preview">
              <h3>✨ What you'll get:</h3>
              <ul>
                <li>📊 Track height and weight over time</li>
                <li>📈 Interactive growth charts</li>
                <li>💡 AI-powered growth insights</li>
                <li>🔔 Customizable reminders</li>
                <li>📋 Milestone tracking</li>
                <li>📱 Multi-child support</li>
              </ul>
            </div>
          </div>
        </div>
        
        <style>
          {`
          .auth-prompt {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 60vh;
          }
          
          .auth-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: 500px;
          }
          
          .auth-card h2 {
            color: #ffd6f5;
            margin-bottom: 1rem;
            font-size: 2rem;
          }
          
          .auth-card p {
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 2rem;
            font-size: 1.1rem;
            line-height: 1.6;
          }
          
          .auth-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
          }
          
          .signin-button, .register-button {
            padding: 1rem 2rem;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .signin-button {
            background: linear-gradient(45deg, #ff79c6, #ff95dd);
            color: white;
          }
          
          .register-button {
            background: linear-gradient(45deg, #50fa7b, #69ff94);
            color: #333;
          }
          
          .signin-button:hover, .register-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
          }
          
          .feature-preview {
            text-align: left;
            background: rgba(255, 255, 255, 0.05);
            padding: 1.5rem;
            border-radius: 12px;
          }
          
          .feature-preview h3 {
            color: #ffd6f5;
            margin-bottom: 1rem;
            text-align: center;
          }
          
          .feature-preview ul {
            list-style: none;
            padding: 0;
          }
          
          .feature-preview li {
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 0.5rem;
            padding-left: 1rem;
          }
          
          @media (max-width: 768px) {
            .auth-card {
              padding: 2rem;
              margin: 1rem;
            }
            
            .auth-buttons {
              flex-direction: column;
            }
          }
          `}
        </style>
      </div>
    );
  }

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
      {insight && (
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
      )}

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
        {growthLogs.length > 0 ? (
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

      <style>
        {`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #0f0c29, #3a005c, #4c2269);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow-x: hidden;
        }

        .growth-container {
          background: linear-gradient(135deg, #1b1a42, #4c2269);
          color: #fff;
          padding: 2rem;
          border-radius: 1rem;
          width: 95%;
          margin: 2rem auto;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          box-sizing: border-box;
        }

                 .title {
           text-align: center;
           font-size: 2.5rem;
           color: #ffd6f5;
           margin-bottom: 1rem;
         }

         .welcome-message {
           text-align: center;
           margin-bottom: 2rem;
         }

         .welcome-message p {
           color: rgba(255, 255, 255, 0.8);
           font-size: 1.1rem;
           font-style: italic;
         }

        .child-selector {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          justify-content: center;
        }

        .child-selector label {
          font-size: 1.1rem;
          font-weight: bold;
        }

        .child-selector select {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: none;
          background: white;
          color: #333;
          font-size: 1rem;
        }

        .add-entry-section {
          text-align: center;
          margin-bottom: 2rem;
        }

        .add-button {
          padding: 1rem 2rem;
          background: linear-gradient(45deg, #ff79c6, #ff95dd);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 121, 198, 0.3);
        }

        .add-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 121, 198, 0.4);
        }

        .entry-form {
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }

        .form-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .form-group {
          flex: 1;
          min-width: 200px;
        }

        .form-group.full-width {
          flex: 100%;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 1rem;
          box-sizing: border-box;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .submit-button {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(45deg, #50fa7b, #69ff94);
          border: none;
          border-radius: 8px;
          color: #333;
          font-weight: bold;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .insight-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          border-left: 4px solid;
        }

        .insight-card.excellent {
          border-left-color: #50fa7b;
        }

        .insight-card.good {
          border-left-color: #8be9fd;
        }

        .insight-card.normal {
          border-left-color: #f1fa8c;
        }

        .insight-card.concern {
          border-left-color: #ff5555;
        }

        .insight-card h3 {
          margin-top: 0;
          color: #ffd6f5;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .stat-item {
          text-align: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .stat-label {
          display: block;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0.5rem;
        }

        .stat-value {
          display: block;
          font-size: 1.2rem;
          font-weight: bold;
          color: #ffd6f5;
        }

        .chart-controls {
          margin-bottom: 2rem;
        }

        .chart-controls h3 {
          text-align: center;
          color: #ffd6f5;
          margin-bottom: 1rem;
        }

        .chart-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .chart-button {
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .chart-button.active {
          background: linear-gradient(45deg, #ff79c6, #ff95dd);
          border-color: transparent;
        }

        .chart-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .chart-container {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .no-data {
          text-align: center;
          color: #666;
          font-size: 1.1rem;
        }

        .reminder-settings {
          background: rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }

        .reminder-settings h3 {
          margin-top: 0;
          color: #ffd6f5;
          margin-bottom: 1rem;
        }

        .reminder-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .reminder-controls label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .reminder-controls input[type="checkbox"] {
          width: auto;
        }

        .reminder-controls select {
          padding: 0.5rem;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .save-settings {
          padding: 0.5rem 1rem;
          background: linear-gradient(45deg, #50fa7b, #69ff94);
          border: none;
          border-radius: 6px;
          color: #333;
          font-weight: bold;
          cursor: pointer;
        }

        .logs-section h3 {
          color: #ffd6f5;
          margin-bottom: 1rem;
        }

        .table-wrapper {
          overflow-x: auto;
          border-radius: 10px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          color: #333;
          border-radius: 10px;
          overflow: hidden;
          min-width: 600px;
        }

        th, td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        th {
          background: #ffe0f0;
          color: #5e2a5c;
          font-weight: bold;
        }

        tr:hover {
          background-color: #f9f2ff;
        }

        .delete-button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 0.25rem;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }

        .delete-button:hover {
          background-color: rgba(255, 0, 0, 0.1);
        }

        .loading {
          text-align: center;
          padding: 2rem;
          color: #ffd6f5;
        }

        .footer-decoration {
          margin-top: 2rem;
          text-align: center;
          font-size: 2rem;
          animation: bounce 2s infinite;
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

        @media (max-width: 768px) {
          .growth-container {
            padding: 1rem;
            margin: 1rem auto;
          }

          .title {
            font-size: 2rem;
          }

          .form-row {
            flex-direction: column;
          }

          .form-group {
            min-width: auto;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .reminder-controls {
            flex-direction: column;
            align-items: flex-start;
          }

          .chart-container {
            padding: 1rem;
            min-height: 300px;
          }
        }
        `}
      </style>
    </div>
  );
};

export default GrowthTracker;
