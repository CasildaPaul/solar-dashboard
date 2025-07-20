import React from 'react';
import { PlusIcon } from './Icons';  // Import the icon

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">Overview</h1>
      <button className="bg-gray-800 p-2 rounded-full">
        <PlusIcon />
      </button>
    </div>
  );
};

export default Header;
