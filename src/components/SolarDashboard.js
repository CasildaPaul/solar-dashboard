import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import LoginPage from '../components/LoginPage';
import GenerationPage from '../components/GenerationPage';
import ExpensesPage from '../components/ExpensePage';
import PerformancePage from '../components/PerformancePage';
import AccountPage from '../components/AccountPage';
import SettingsPage from '../components/SettingsPage';
import ActiveDevicesPage from '../components/ActiveDevicesPage';
import InactiveDevicesPage from '../components/InactiveDevicesPage';


const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return (
      <Router>
        <div className={`min-h-screen transition-all duration-300
          ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
        >
          <LoginPage darkMode={darkMode} onLogin={handleLogin} />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className={`min-h-screen flex transition-all duration-300
        ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
      >
        {/* Sidebar - fixed height with no scroll */}
        <div className="h-screen sticky top-0">
          <Sidebar darkMode={darkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
        </div>

        {/* Main Content - scrollable */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/generation" />} />
            <Route path="/generation" element={<GenerationPage darkMode={darkMode} />} />
            <Route path="/expenses" element={<ExpensesPage darkMode={darkMode} />} />
            <Route path="/performance" element={<PerformancePage darkMode={darkMode} />} />
            <Route path="/account" element={<AccountPage darkMode={darkMode} />} />
            <Route path="/settings" element={<SettingsPage darkMode={darkMode} />} />
            <Route path="/devices/active" element={<ActiveDevicesPage darkMode={darkMode} />} />
            <Route path="/devices/inactive" element={<InactiveDevicesPage darkMode={darkMode} />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
