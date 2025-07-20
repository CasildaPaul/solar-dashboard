import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, AlertTriangle, Calendar } from 'lucide-react';

const PerformancePage = ({ darkMode }) => {
  const [timeframe, setTimeframe] = useState('week');
  const [realtimeData, setRealtimeData] = useState([]);
  const [timeframeData, setTimeframeData] = useState([]); // Renamed from dailyData to timeframeData
  const [alerts, setAlerts] = useState([]);
  const [inverters, setInverters] = useState([]);
  const [summary, setSummary] = useState({
    currentEfficiency: 0,
    averageDailyEfficiency: 0,
    totalUptime: 0,
    maintenanceStatus: 'good',
    nextScheduledMaintenance: '',
    healthScore: 0
  });
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);

  useEffect(() => {
    // Start loading
    setLoading(true);
    
    // Dummy data setup
    setRealtimeData([
      { timestamp: Date.now() - 5000, efficiency: 90 },
      { timestamp: Date.now() - 4000, efficiency: 85 },
      { timestamp: Date.now() - 3000, efficiency: 92 },
      { timestamp: Date.now() - 2000, efficiency: 88 },
      { timestamp: Date.now() - 1000, efficiency: 91 },
    ]);
    
    setSummary({
      currentEfficiency: 91,
      averageDailyEfficiency: 88,
      totalUptime: 1000,
      maintenanceStatus: 'good',
      nextScheduledMaintenance: '2025-06-01',
      healthScore: 85,
    });
    
    setAlerts([
      { id: 1, type: 'Power Loss', severity: 'high', message: 'Power loss detected in Inverter 3', timestamp: Date.now() },
      { id: 2, type: 'Overheating', severity: 'medium', message: 'Inverter 2 is overheating', timestamp: Date.now() - 5000 },
    ]);
    
    setInverters([
      { id: 1, name: 'Inverter 1', status: 'online', powerOutput: 50 },
      { id: 2, name: 'Inverter 2', status: 'warning', powerOutput: 45 },
      { id: 3, name: 'Inverter 3', status: 'offline', powerOutput: 0 },
    ]);

    // Generate appropriate data based on selected timeframe
    let newData = [];
    
    if (timeframe === 'day') {
      // Hourly data for a day
      for (let i = 0; i < 24; i++) {
        newData.push({
          date: `${i}:00`,
          efficiency: Math.floor(80 + Math.random() * 15),
          expected: 90
        });
      }
    } else if (timeframe === 'week') {
      // Daily data for a week
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      for (let i = 0; i < 7; i++) {
        newData.push({
          date: days[i],
          efficiency: Math.floor(80 + Math.random() * 15),
          expected: 90
        });
      }
    } else if (timeframe === 'month') {
      // Data for a month (30 days)
      for (let i = 1; i <= 30; i++) {
        newData.push({
          date: `${i}`,
          efficiency: Math.floor(80 + Math.random() * 15),
          expected: 90
        });
      }
    }
    
    setTimeframeData(newData);
    setLoading(false);
  }, [timeframe]); // This effect now depends on timeframe

  const getAlertSeverityColor = (severity) => {
    if (darkMode) {
      switch (severity) {
        case 'high':
          return 'bg-red-100 bg-opacity-20 text-red-300 border border-red-400';
        case 'medium':
          return 'bg-yellow-100 bg-opacity-20 text-yellow-300 border border-yellow-400';
        case 'low':
          return 'bg-blue-100 bg-opacity-20 text-blue-300 border border-blue-400';
        default:
          return 'bg-gray-700 text-gray-300';
      }
    } else {
      switch (severity) {
        case 'high':
          return 'bg-red-100 text-red-800 border border-red-200';
        case 'medium':
          return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        case 'low':
          return 'bg-blue-100 text-blue-800 border border-blue-200';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }
  };

  const getInverterStatusColor = (status) => {
    if (darkMode) {
      switch (status) {
        case 'online':
          return 'bg-green-100 bg-opacity-20 text-green-300 border border-green-400';
        case 'offline':
          return 'bg-red-100 bg-opacity-20 text-red-300 border border-red-400';
        case 'warning':
          return 'bg-yellow-100 bg-opacity-20 text-yellow-300 border border-yellow-400';
        default:
          return 'bg-gray-700 text-gray-300';
      }
    } else {
      switch (status) {
        case 'online':
          return 'bg-green-100 text-green-800 border border-green-200';
        case 'offline':
          return 'bg-red-100 text-red-800 border border-red-200';
        case 'warning':
          return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }
  };

  const getMaintenanceStatusColor = (status) => {
    if (darkMode) {
      switch (status) {
        case 'good':
          return 'text-green-400';
        case 'pending':
          return 'text-yellow-400';
        case 'required':
          return 'text-red-400';
        default:
          return 'text-gray-400';
      }
    } else {
      switch (status) {
        case 'good':
          return 'text-green-600';
        case 'pending':
          return 'text-yellow-600';
        case 'required':
          return 'text-red-600';
        default:
          return 'text-gray-600';
      }
    }
  };

  // Show loading indicator when timeframe changes
  if (loading) {
    return <div className={`p-6 flex justify-center items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading performance data...</div>;
  }

  return (
    <div className={`p-6 min-h-screen ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-700'}`}>
      <div className="flex items-center mb-6">
        <Zap className={`w-6 h-6 mr-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>System Performance</h1>
      </div>

      {error && <div className={`p-4 mb-6 rounded-md ${darkMode ? 'bg-red-900 bg-opacity-50 text-red-300 border border-red-700' : 'bg-red-100 text-red-700 border border-red-200'}`}>{error}</div>}
      }

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Current Efficiency</h3>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{summary.currentEfficiency}%</p>
        </div>
        <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg Daily Efficiency</h3>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{summary.averageDailyEfficiency}%</p>
        </div>
        <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>System Uptime</h3>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{summary.totalUptime}hrs</p>
        </div>
        <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Health Score</h3>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{summary.healthScore}/100</p>
        </div>
        <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Maintenance Status</h3>
          <div className="flex items-center">
            <p className={`text-lg font-bold ${getMaintenanceStatusColor(summary.maintenanceStatus)}`}>
              {summary.maintenanceStatus.charAt(0).toUpperCase() + summary.maintenanceStatus.slice(1)}
            </p>
            <Calendar className={`ml-2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`text-xs ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Next: {summary.nextScheduledMaintenance}</span>
          </div>
        </div>
      </div>

      <div className={`mb-6 p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Real-time Efficiency</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={realtimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(time) => {
                const date = new Date(time);
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              }}
              stroke={darkMode ? '#9CA3AF' : '#6B7280'}
            />
            <YAxis domain={[0, 100]} stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
            <Tooltip 
              labelFormatter={(label) => {
                const date = new Date(label);
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
              }}
              formatter={(value) => [`${value}%`, 'Efficiency']}
              contentStyle={darkMode ? 
                { backgroundColor: '#1F2937', borderColor: '#4B5563', color: '#E5E7EB' } : 
                { backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', color: '#111827' }
              }
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="efficiency" 
              stroke="#8884d8" 
              name="Efficiency (%)" 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Efficiency Comparison</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setTimeframe('day')}
                className={`px-3 py-1 rounded ${
                  timeframe === 'day' 
                    ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
                    : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')
                }`}
              >
                Day
              </button>
              <button 
                onClick={() => setTimeframe('week')}
                className={`px-3 py-1 rounded ${
                  timeframe === 'week' 
                    ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
                    : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')
                }`}
              >
                Week
              </button>
              <button 
                onClick={() => setTimeframe('month')}
                className={`px-3 py-1 rounded ${
                  timeframe === 'month' 
                    ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
                    : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')
                }`}
              >
                Month
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeframeData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
              <XAxis dataKey="date" stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
              <YAxis domain={[0, 100]} stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Efficiency']} 
                contentStyle={darkMode ? 
                  { backgroundColor: '#1F2937', borderColor: '#4B5563', color: '#E5E7EB' } : 
                  { backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', color: '#111827' }
                }
              />
              <Legend />
              <Bar dataKey="efficiency" fill="#8884d8" name="Actual Efficiency (%)" />
              <Bar dataKey="expected" fill="#82ca9d" name="Expected Efficiency (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Alerts</h2>
          <div className="max-h-80 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No alerts at this time</div>
            ) : (
              <div className="space-y-2">
                {alerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-3 rounded-lg ${getAlertSeverityColor(alert.severity)} flex items-start`}
                  >
                    <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                    <div>
                      <div className="flex justify-between">
                        <span className="font-medium">{alert.type}</span>
                        <span className="text-xs">
                          {new Date(alert.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg shadow mb-6 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Inverter Status</h2>
        <div className="overflow-x-auto">
          <table className={`min-w-full divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            <thead>
              <tr>
                <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Inverter</th>
                <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Power Output</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {inverters.map((inverter) => (
                <tr key={inverter.id}>
                  <td className={`px-4 py-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{inverter.name}</td>
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded-full text-xs ${getInverterStatusColor(inverter.status)}`}>
                      {inverter.status}
                    </span>
                  </td>
                  <td className={`px-4 py-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{inverter.powerOutput} kW</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;