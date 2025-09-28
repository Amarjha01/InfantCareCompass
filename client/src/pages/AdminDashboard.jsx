import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  UserCheck,
  Stethoscope,
  Activity,
  TrendingUp,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import adminAPI from '../api/adminAPI';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useSelector(state => state.user);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }

    fetchAnalytics();
  }, [isAuthenticated, user, navigate]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getDashboardAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-white text-3xl font-bold mt-2">{value}</p>
          {trend && (
            <p className="text-white/90 text-sm mt-1 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className="bg-white/20 p-3 rounded-full">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t('admin.dashboard')}</h1>
          <p className="text-gray-300">Welcome back, Admin! Here's what's happening with your platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title={t('admin.totalUsers')}
            value={analytics?.users?.total || 0}
            icon={Users}
            color="from-blue-500 to-blue-600"
            trend="+12% from last month"
          />
          <StatCard
            title="Active Users"
            value={analytics?.system?.activeUsers || 0}
            icon={UserCheck}
            color="from-green-500 to-green-600"
            trend="+8% from last month"
          />
          <StatCard
            title="Total Doctors"
            value={analytics?.doctors?.total || 0}
            icon={Stethoscope}
            color="from-purple-500 to-purple-600"
            trend="+5% from last month"
          />
          <StatCard
            title="Pending Approvals"
            value={analytics?.doctors?.pending || 0}
            icon={AlertCircle}
            color="from-orange-500 to-orange-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth Chart */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { month: 'Jan', users: 120 },
                { month: 'Feb', users: 150 },
                { month: 'Mar', users: 180 },
                { month: 'Apr', users: 220 },
                { month: 'May', users: 280 },
                { month: 'Jun', users: analytics?.users?.total || 320 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" stroke="#ffffff80" />
                <YAxis stroke="#ffffff80" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #ffffff20',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Doctor Status Distribution */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">Doctor Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Approved', value: analytics?.doctors?.approved || 0 },
                    { name: 'Pending', value: analytics?.doctors?.pending || 0 },
                    { name: 'Rejected', value: 0 }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[
                    { name: 'Approved', value: analytics?.doctors?.approved || 0 },
                    { name: 'Pending', value: analytics?.doctors?.pending || 0 },
                    { name: 'Rejected', value: 0 }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="font-medium">New doctor registration</p>
                  <p className="text-sm text-gray-400">Dr. Sarah Johnson joined the platform</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">2 hours ago</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium">User milestone reached</p>
                  <p className="text-sm text-gray-400">1000th user registered</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">1 day ago</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-medium">Security update</p>
                  <p className="text-sm text-gray-400">Enhanced authentication system</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;