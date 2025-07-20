import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RealTimeCharts = ({ darkMode }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        time: new Date().toLocaleTimeString(),
        power: Math.floor(Math.random() * 1000) + 100,   // Power Generation (W)
        expenses: Math.floor(Math.random() * 500) + 50   // Expenses (INR)
      };
      setData((prevData) => [...prevData.slice(-10), newData]); // Keep only last 10 data points
    }, 2000);  // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const latestPower = data[data.length - 1]?.power;
  const latestExpenses = data[data.length - 1]?.expenses;

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Power Generation Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Real-time Power Generation</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="power" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
        {/* Power Value Display in a Styled Box */}
        {latestPower !== undefined && (
          <div className="mt-2 text-center">
            <div className="bg-green-100 text-green-700 text-sm font-semibold py-2 px-4 rounded-lg shadow-md inline-block">
              Power: {latestPower} W
            </div>
          </div>
        )}
      </div>

      {/* Expenses Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Real-time Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="expenses" stroke="#FF6347" />
          </LineChart>
        </ResponsiveContainer>
        {/* Expenses Value Display in a Styled Box */}
        {latestExpenses !== undefined && (
          <div className="mt-2 text-center">
            <div className="bg-red-100 text-red-700 text-sm font-semibold py-2 px-4 rounded-lg shadow-md inline-block">
              Expenses: ₹{latestExpenses}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeCharts;
