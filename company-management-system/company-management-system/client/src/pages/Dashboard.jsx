import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'employees', label: 'Employees' },
  { key: 'departments', label: 'Departments' },
  { key: 'products', label: 'Products' },
  { key: 'defects', label: 'Defects' },
  { key: 'materials', label: 'Raw Materials' },
];

const COLORS = ['#6366f1', '#10b981', '#f59e42', '#ef4444', '#3b82f6', '#a21caf'];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('/api/stats');
        setStats(res.data);
      } catch (err) {
        setError('Failed to load stats');
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const chartData = stats ? [
    { name: 'Employees', value: Number(stats.total_employees) },
    { name: 'Departments', value: Number(stats.total_departments || 0) },
    { name: 'Products', value: Number(stats.total_products) },
    { name: 'Defects', value: Number(stats.total_defects) },
    { name: 'Raw Materials', value: Number(stats.total_materials) },
  ] : [];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="mb-6 flex space-x-2 border-b">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`px-4 py-2 font-semibold border-b-2 transition ${activeTab === tab.key ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-600'}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="text-center py-8">Loading stats...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded shadow p-6">
                <h2 className="text-xl font-bold mb-2">Company Overview</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6366f1">
                      {chartData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded shadow p-6">
                <h2 className="text-xl font-bold mb-2">Distribution</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {chartData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          {activeTab === 'employees' && (
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-xl font-bold mb-2">Total Employees</h2>
              <div className="text-4xl font-bold text-blue-600">{stats.total_employees}</div>
            </div>
          )}
          {activeTab === 'departments' && (
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-xl font-bold mb-2">Total Departments</h2>
              <div className="text-4xl font-bold text-green-600">{stats.total_departments || 0}</div>
            </div>
          )}
          {activeTab === 'products' && (
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-xl font-bold mb-2">Total Products</h2>
              <div className="text-4xl font-bold text-yellow-600">{stats.total_products}</div>
            </div>
          )}
          {activeTab === 'defects' && (
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-xl font-bold mb-2">Total Defects</h2>
              <div className="text-4xl font-bold text-red-600">{stats.total_defects}</div>
            </div>
          )}
          {activeTab === 'materials' && (
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-xl font-bold mb-2">Total Raw Materials</h2>
              <div className="text-4xl font-bold text-purple-600">{stats.total_materials}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
