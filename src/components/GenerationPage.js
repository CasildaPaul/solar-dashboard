import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';

// Dummy data generator for historical views
const generateMockData = (timeframe) => {
  const generateDataForDay = () => {
    return Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      generation: Math.floor(Math.random() * 1000),
    }));
  };

  const generateDataForWeek = () => {
    return Array.from({ length: 7 }, (_, i) => ({
      period: `Day ${i + 1}`,
      generation: Math.floor(Math.random() * 7000),
    }));
  };

  const generateDataForMonth = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
      period: month,
      generation: Math.floor(Math.random() * 30000),
    }));
  };

  const generateDataForYear = () => {
    const years = ['2021', '2022', '2023', '2024', '2025'];
    return years.map(year => ({
      period: year,
      generation: Math.floor(Math.random() * 120000),
    }));
  };

  switch (timeframe) {
    case 'day': return generateDataForDay();
    case 'week': return generateDataForWeek();
    case 'month': return generateDataForMonth();
    case 'year': return generateDataForYear();
    default: return [];
  }
};

const SummaryCard = ({ title, value, darkMode }) => (
  <div style={{
    flex: 1,
    background: darkMode ? '#1F2937' : 'white',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: darkMode ? '0 2px 6px rgba(0, 0, 0, 0.3)' : '0 2px 6px rgba(0, 0, 0, 0.1)',
    color: darkMode ? '#E5E7EB' : 'inherit'
  }}>
    <p style={{ color: darkMode ? '#9CA3AF' : '#555', fontSize: '14px', marginBottom: '4px' }}>{title}</p>
    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{value}</p>
  </div>
);

const GenerationPage = ({ darkMode }) => {
  const [timeframe, setTimeframe] = useState('day');
  const [realtimeData, setRealtimeData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [summary, setSummary] = useState({
    currentPower: 620,
    dailyGeneration: 18.5,
    weeklyGeneration: 120.3,
    monthlyGeneration: 512.7,
    totalLifetimeGeneration: 10500.9,
  });

  useEffect(() => {
    let basePower = 600;
    const interval = setInterval(() => {
      const fluctuation = Math.floor(Math.random() * 100) - 50;
      basePower = Math.max(100, basePower + Math.floor(Math.random() * 11) - 5);
      const newPower = Math.max(100, basePower + fluctuation);

      const newData = {
        timestamp: new Date().toISOString(),
        power: newPower,
      };

      setRealtimeData((prevData) => {
        const updated = [...prevData, newData];
        return updated.slice(-20);
      });

      setSummary((prev) => ({
        ...prev,
        currentPower: newPower,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHistoricalData(generateMockData(timeframe));
  }, [timeframe]);

  const chartTheme = {
    backgroundColor: darkMode ? '#111827' : '#f4f4f4',
    textColor: darkMode ? '#E5E7EB' : '#333',
    gridColor: darkMode ? '#374151' : '#ccc',
    tooltipBg: darkMode ? '#1F2937' : 'white',
    tooltipText: darkMode ? '#E5E7EB' : '#333'
  };

  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: darkMode ? '#111827' : 'white',
      color: darkMode ? '#E5E7EB' : '#333',
      transition: 'all 0.3s ease'
    }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '1rem' }}>⚡ Solar Generation Dashboard</h1>

      {/* Summary Section */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <SummaryCard darkMode={darkMode} title="Current Power" value={`${summary.currentPower} W`} />
        <SummaryCard darkMode={darkMode} title="Today's Generation" value={`${summary.dailyGeneration} kWh`} />
        <SummaryCard darkMode={darkMode} title="This Week" value={`${summary.weeklyGeneration} kWh`} />
        <SummaryCard darkMode={darkMode} title="This Month" value={`${summary.monthlyGeneration} kWh`} />
        <SummaryCard darkMode={darkMode} title="Lifetime" value={`${summary.totalLifetimeGeneration} kWh`} />
      </div>

      {/* Real-time Chart */}
      <div style={{ 
        background: chartTheme.backgroundColor, 
        padding: '1.5rem', 
        borderRadius: '10px', 
        marginBottom: '2rem',
        transition: 'all 0.3s ease'
      }}>
        <h2 style={{ marginBottom: '1rem', color: chartTheme.textColor }}>📈 Real-time Generation</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={realtimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
            <XAxis 
              dataKey="timestamp" 
              stroke={chartTheme.textColor}
              tickFormatter={(time) => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
            <YAxis stroke={chartTheme.textColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: chartTheme.tooltipBg,
                color: chartTheme.tooltipText,
                border: `1px solid ${darkMode ? '#374151' : '#ddd'}`
              }}
              labelFormatter={(label) => new Date(label).toLocaleTimeString()}
              formatter={(value) => [`${value} W`, 'Power']}
            />
            <Legend wrapperStyle={{ color: chartTheme.textColor }} />
            <Line type="monotone" dataKey="power" stroke="#34D399" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Historical Chart */}
      <div style={{ 
        background: chartTheme.backgroundColor, 
        padding: '1.5rem', 
        borderRadius: '10px',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h2 style={{ color: chartTheme.textColor }}>📊 Historical Generation</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['day', 'week', 'month', 'year'].map(frame => (
              <button
                key={frame}
                onClick={() => setTimeframe(frame)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: timeframe === frame 
                    ? (darkMode ? '#3B82F6' : '#007BFF') 
                    : (darkMode ? '#4B5563' : '#d1d5db'),
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {frame.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
            <XAxis dataKey={timeframe === 'day' ? 'time' : 'period'} stroke={chartTheme.textColor} />
            <YAxis stroke={chartTheme.textColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: chartTheme.tooltipBg,
                color: chartTheme.tooltipText,
                border: `1px solid ${darkMode ? '#374151' : '#ddd'}`
              }}
              formatter={(value) => [`${value} ${timeframe === 'day' ? 'W' : 'kWh'}`, 'Generation']}
            />
            <Legend wrapperStyle={{ color: chartTheme.textColor }} />
            <Bar dataKey="generation" fill={darkMode ? '#FBBF24' : '#F59E0B'} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GenerationPage;