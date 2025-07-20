import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const DARK_COLORS = ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA'];

const ExpensesPage = ({ darkMode }) => {
  const [timeframe, setTimeframe] = useState('month');
  const [realtimeData, setRealtimeData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [summary, setSummary] = useState({
    currentRate: 0,
    dailyExpense: 0,
    weeklyExpense: 0,
    monthlyExpense: 0,
    yearlyExpense: 0,
    totalSavings: 0,
    roiPercentage: 0,
    breakEvenDate: ''
  });
  const [usageBreakdown, setUsageBreakdown] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // For animating the graphs
  const realtimeInterval = useRef(null);

  useEffect(() => {
    // Replace this with mock data to simulate fetching
    setLoading(true);

    // Initial Mock Data for Realtime
    setRealtimeData([
      { timestamp: Date.now() - 3600000, cost: 5.23 },
      { timestamp: Date.now() - 1800000, cost: 5.45 },
      { timestamp: Date.now(), cost: 5.50 },
    ]);

    // Mock Summary Data
    setSummary({
      currentRate: 5.50,
      dailyExpense: 30,
      weeklyExpense: 210,
      monthlyExpense: 900,
      yearlyExpense: 10800,
      totalSavings: 1500,
      roiPercentage: 15,
      breakEvenDate: '2025-12-15',
    });

    // Mock Usage Breakdown
    setUsageBreakdown([
      { category: 'Energy', value: 250 },
      { category: 'Utilities', value: 150 },
      { category: 'Food', value: 200 },
      { category: 'Entertainment', value: 100 },
    ]);

    // Mock Data for Timeframe - setup data for all timeframes
    setDailyData([
      { date: '2025-05-01', cost: 5.50 },
      { date: '2025-05-02', cost: 4.75 },
      { date: '2025-05-03', cost: 6.00 },
      { date: '2025-05-04', cost: 5.25 },
      { date: '2025-05-05', cost: 5.80 },
    ]);
    
    setWeeklyData([
      { week: 'Week 1', cost: 35.40 },
      { week: 'Week 2', cost: 42.10 },
      { week: 'Week 3', cost: 38.75 },
      { week: 'Week 4', cost: 44.20 },
    ]);
    
    setMonthlyData([
      { month: 'Jan', cost: 200 },
      { month: 'Feb', cost: 180 },
      { month: 'Mar', cost: 220 },
      { month: 'Apr', cost: 190 },
      { month: 'May', cost: 210 },
    ]);
    
    setYearlyData([
      { year: '2021', cost: 9800 },
      { year: '2022', cost: 10300 },
      { year: '2023', cost: 11200 },
      { year: '2024', cost: 10800 },
      { year: '2025', cost: 5400 },
    ]);

    setError(null);
    setLoading(false);
  }, []);

  // Start realtime data simulation
  useEffect(() => {
    // Clear any existing intervals
    if (realtimeInterval.current) {
      clearInterval(realtimeInterval.current);
    }

    // Set up the interval for updating realtime data
    realtimeInterval.current = setInterval(() => {
      const lastCost = realtimeData.length > 0 ? realtimeData[realtimeData.length - 1].cost : 5.50;
      const randomChange = (Math.random() - 0.5) * 0.4; // Random fluctuation between -0.2 and 0.2
      const newCost = Math.max(4.5, Math.min(6.5, lastCost + randomChange)); // Keep within 4.5 to 6.5 range
      
      const newData = {
        timestamp: Date.now(),
        cost: newCost
      };

      setRealtimeData(prevData => {
        const updatedData = [...prevData, newData];
        // Keep only the last 10 data points
        return updatedData.length > 10 ? updatedData.slice(-10) : updatedData;
      });

      // Update current rate in summary
      setSummary(prev => ({
        ...prev,
        currentRate: newCost
      }));
    }, 3000);

    return () => {
      if (realtimeInterval.current) {
        clearInterval(realtimeInterval.current);
      }
    };
  }, [realtimeData.length, realtimeData]);

  // Theme colors based on dark mode
  const theme = {
    backgroundColor: darkMode ? '#1F2937' : 'white',
    textColor: darkMode ? '#E5E7EB' : '#111827',
    mutedTextColor: darkMode ? '#9CA3AF' : '#6B7280',
    cardBg: darkMode ? '#111827' : 'white',
    gridColor: darkMode ? '#374151' : '#E5E7EB',
    lineColor: darkMode ? '#F87171' : '#F87171',
    buttonActiveBg: darkMode ? '#3B82F6' : '#3B82F6',
    buttonInactiveBg: darkMode ? '#4B5563' : '#E5E7EB',
    buttonInactiveText: darkMode ? '#E5E7EB' : '#111827',
    tooltipBg: darkMode ? '#111827' : 'white',
    tooltipBorder: darkMode ? '#374151' : '#E5E7EB',
    shadowColor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'
  };

  const renderTimeframeData = () => {
    switch (timeframe) {
      case 'day':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
              <XAxis dataKey="date" stroke={theme.textColor} />
              <YAxis stroke={theme.textColor} />
              <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, 'Cost']}
                contentStyle={{
                  backgroundColor: theme.tooltipBg,
                  color: theme.textColor,
                  border: `1px solid ${theme.tooltipBorder}`
                }}
              />
              <Legend wrapperStyle={{ color: theme.textColor }} />
              <Bar dataKey="cost" fill={darkMode ? '#F87171' : '#F87171'} name="Cost ($)" animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'week':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
              <XAxis dataKey="week" stroke={theme.textColor} />
              <YAxis stroke={theme.textColor} />
              <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, 'Cost']}
                contentStyle={{
                  backgroundColor: theme.tooltipBg,
                  color: theme.textColor,
                  border: `1px solid ${theme.tooltipBorder}`
                }}
              />
              <Legend wrapperStyle={{ color: theme.textColor }} />
              <Bar dataKey="cost" fill={darkMode ? '#F87171' : '#F87171'} name="Cost ($)" animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'month':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
              <XAxis dataKey="month" stroke={theme.textColor} />
              <YAxis stroke={theme.textColor} />
              <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, 'Cost']}
                contentStyle={{
                  backgroundColor: theme.tooltipBg,
                  color: theme.textColor,
                  border: `1px solid ${theme.tooltipBorder}`
                }}
              />
              <Legend wrapperStyle={{ color: theme.textColor }} />
              <Bar dataKey="cost" fill={darkMode ? '#F87171' : '#F87171'} name="Cost ($)" animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'year':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
              <XAxis dataKey="year" stroke={theme.textColor} />
              <YAxis stroke={theme.textColor} />
              <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, 'Cost']}
                contentStyle={{
                  backgroundColor: theme.tooltipBg,
                  color: theme.textColor,
                  border: `1px solid ${theme.tooltipBorder}`
                }}
              />
              <Legend wrapperStyle={{ color: theme.textColor }} />
              <Bar dataKey="cost" fill={darkMode ? '#F87171' : '#F87171'} name="Cost ($)" animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  if (loading && !realtimeData.length) {
    return (
      <div 
        style={{
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.backgroundColor,
          color: theme.textColor,
          transition: 'all 0.3s ease'
        }}
      >
        Loading expense data...
      </div>
    );
  }

  return (
    <div style={{
      padding: '1.5rem',
      backgroundColor: theme.backgroundColor,
      color: theme.textColor,
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <DollarSign style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem', color: '#F87171' }} />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Expenses & Savings</h1>
      </div>
      
      {error && (
        <div style={{
          padding: '1rem',
          marginBottom: '1.5rem',
          backgroundColor: darkMode ? '#7F1D1D' : '#FEE2E2',
          color: darkMode ? '#FECACA' : '#B91C1C',
          borderRadius: '0.375rem'
        }}>
          {error}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '1rem',
        marginBottom: '1.5rem',
        '@media (min-width: 768px)': {
          gridTemplateColumns: 'repeat(2, 1fr)'
        },
        '@media (min-width: 1024px)': {
          gridTemplateColumns: 'repeat(4, 1fr)'
        }
      }}>
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '1rem',
          borderRadius: '0.5rem',
          boxShadow: `0 1px 3px ${theme.shadowColor}`,
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{ fontSize: '0.875rem', color: theme.mutedTextColor }}>Current Rate</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${summary.currentRate.toFixed(2)}/hr</p>
        </div>
        
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '1rem',
          borderRadius: '0.5rem',
          boxShadow: `0 1px 3px ${theme.shadowColor}`,
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{ fontSize: '0.875rem', color: theme.mutedTextColor }}>This Month</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${summary.monthlyExpense.toFixed(2)}</p>
        </div>
        
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '1rem',
          borderRadius: '0.5rem',
          boxShadow: `0 1px 3px ${theme.shadowColor}`,
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{ fontSize: '0.875rem', color: theme.mutedTextColor }}>Total Savings</h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>${summary.totalSavings.toFixed(2)}</p>
            <TrendingDown style={{ marginLeft: '0.5rem', width: '1.25rem', height: '1.25rem', color: '#10B981' }} />
          </div>
        </div>
        
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '1rem',
          borderRadius: '0.5rem',
          boxShadow: `0 1px 3px ${theme.shadowColor}`,
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{ fontSize: '0.875rem', color: theme.mutedTextColor }}>ROI</h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6' }}>{summary.roiPercentage}%</p>
            <TrendingUp style={{ marginLeft: '0.5rem', width: '1.25rem', height: '1.25rem', color: '#3B82F6' }} />
          </div>
          <p style={{ fontSize: '0.75rem', color: theme.mutedTextColor }}>Break-even: {summary.breakEvenDate}</p>
        </div>
      </div>

      <div style={{
        marginBottom: '1.5rem',
        backgroundColor: theme.cardBg,
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: `0 1px 3px ${theme.shadowColor}`,
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Real-time Cost</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={realtimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
            <XAxis 
              dataKey="timestamp" 
              stroke={theme.textColor}
              tickFormatter={(time) => {
                const date = new Date(time);
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              }}
            />
            <YAxis stroke={theme.textColor} />
            <Tooltip 
              labelFormatter={(label) => {
                const date = new Date(label);
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
              }}
              formatter={(value) => [`$${value.toFixed(4)}`, 'Cost per kWh']}
              contentStyle={{
                backgroundColor: theme.tooltipBg,
                color: theme.textColor,
                border: `1px solid ${theme.tooltipBorder}`
              }}
            />
            <Legend wrapperStyle={{ color: theme.textColor }} />
            <Line 
              type="monotone" 
              dataKey="cost" 
              stroke="#F87171" 
              name="Cost ($)" 
              dot={false} 
              isAnimationActive={true}
              animationDuration={500}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1.5rem',
        marginBottom: '1.5rem',
        '@media (min-width: 1024px)': {
          gridTemplateColumns: '2fr 1fr'
        }
      }}>
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '1rem',
          borderRadius: '0.5rem',
          boxShadow: `0 1px 3px ${theme.shadowColor}`,
          transition: 'all 0.3s ease',
          '@media (min-width: 1024px)': {
            gridColumn: 'span 2'
          }
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Historical Expenses</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['day', 'week', 'month', 'year'].map(frame => (
                <button 
                  key={frame}
                  onClick={() => setTimeframe(frame)}
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0.25rem',
                    backgroundColor: timeframe === frame ? theme.buttonActiveBg : theme.buttonInactiveBg,
                    color: timeframe === frame ? 'white' : theme.buttonInactiveText,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {frame.charAt(0).toUpperCase() + frame.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {renderTimeframeData()}
        </div>

        <div style={{
          backgroundColor: theme.cardBg,
          padding: '1rem',
          borderRadius: '0.5rem',
          boxShadow: `0 1px 3px ${theme.shadowColor}`,
          transition: 'all 0.3s ease'
        }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Usage Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={usageBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="category"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                isAnimationActive={true}
                animationBegin={0}
                animationDuration={1200}
                animationEasing="ease-out"
              >
                {usageBreakdown.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={darkMode ? DARK_COLORS[index % DARK_COLORS.length] : COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                contentStyle={{
                  backgroundColor: theme.tooltipBg,
                  color: theme.textColor,
                  border: `1px solid ${theme.tooltipBorder}`
                }}
              />
              <Legend wrapperStyle={{ color: theme.textColor }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;