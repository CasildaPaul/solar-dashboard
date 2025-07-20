import React from 'react';

const PerformanceMonitoring = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Performance Monitoring</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400">Status</p>
          <p className="text-green-400 font-bold">Active</p>
        </div>
        <div>
          <p className="text-gray-400">Capacity</p>
          <p className="text-white font-bold">360 kWh</p>
        </div>
        <div>
          <p className="text-gray-400">Consumption</p>
          <p className="text-white font-bold">280 kWh</p>
        </div>
        <div>
          <p className="text-gray-400">Charging</p>
          <p className="text-yellow-400 font-bold">112.8 kWh</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitoring;
