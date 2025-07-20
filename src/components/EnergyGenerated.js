import React from 'react';
import { Bar } from 'react-chartjs-2';

const EnergyGenerated = () => {
  const data = {
    labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM'],
    datasets: [
      {
        label: 'Energy Generated (kWh)',
        data: [20, 26, 30, 24, 18, 15],
        backgroundColor: '#facc15',
        borderRadius: 5,
      }
    ]
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Energy Generated</h3>
      <Bar data={data} />
    </div>
  );
};

export default EnergyGenerated;
