import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts';

const solarGenerationData = [
  { time: '06:00', generation: 2.1 },
  { time: '08:00', generation: 4.3 },
  { time: '10:00', generation: 6.5 },
  { time: '12:00', generation: 8.2 },
  { time: '14:00', generation: 7.4 },
];

const solarGenerationByInverterData = [
  { time: '06:00', Inverter1: 1.2, Inverter2: 0.9 },
  { time: '08:00', Inverter1: 2.5, Inverter2: 1.8 },
  { time: '10:00', Inverter1: 3.8, Inverter2: 2.7 },
  { time: '12:00', Inverter1: 4.1, Inverter2: 4.1 },
  { time: '14:00', Inverter1: 3.6, Inverter2: 3.8 },
];

const Charts = () => (
  <div className="grid md:grid-cols-2 gap-6">
    <div>
      <h3 className="text-lg font-semibold mb-2">Solar Generation</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={solarGenerationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis label={{ value: 'kW', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="generation" fill="#FFC107" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-2">Solar Generation by Inverter</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={solarGenerationByInverterData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Inverter1" fill="#4CAF50" />
          <Bar dataKey="Inverter2" fill="#2196F3" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default Charts;
