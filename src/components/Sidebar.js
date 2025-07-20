import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import {
  Sun,
  DollarSign,
  Zap,
  ChevronLeft,
  ChevronRight,
  Settings,
  User,
  Smartphone,
} from 'lucide-react';

const Sidebar = ({ darkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDevicesOpen, setIsDevicesOpen] = useState(false);
  const [showText, setShowText] = useState(true);
  const location = useLocation();

  // Auto-expand devices dropdown if user is on a device page
  useEffect(() => {
    if (location.pathname.startsWith('/devices/')) {
      setIsDevicesOpen(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    let timeoutId;
    if (!isOpen) {
      timeoutId = setTimeout(() => setShowText(false), 200);
    } else {
      setShowText(true);
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDevicesDropdown = () => setIsDevicesOpen(!isDevicesOpen);

  return (
    <div
      className={`relative flex flex-col min-h-screen transition-all duration-300 
        ${isOpen ? 'w-64' : 'w-20'} 
        ${darkMode ? 'bg-gray-800' : 'bg-gray-900'} text-white shadow-lg`}
    >
      {/* Sidebar Content */}
      <div className="flex flex-col flex-grow p-6">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h2
            className={`text-2xl font-bold transition-all duration-300 
              ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}
              ${showText ? 'visible' : 'invisible'}`}
          >
            Solar Panel
          </h2>
          <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
        </div>

        {/* Navigation Links */}
        <nav className="space-y-6">
          <NavLink
            to="/generation"
            className={({ isActive }) => 
              `flex items-center space-x-2 transition-colors duration-300 ${
                isActive 
                  ? 'text-yellow-400' 
                  : 'text-white hover:text-yellow-400'
              }`
            }
          >
            <Sun className="h-5 w-5" />
            {isOpen && showText && (
              <span className="transition-opacity duration-300">
                Generation
              </span>
            )}
          </NavLink>

          <NavLink
            to="/expenses"
            className={({ isActive }) => 
              `flex items-center space-x-2 transition-colors duration-300 ${
                isActive 
                  ? 'text-yellow-400' 
                  : 'text-white hover:text-yellow-400'
              }`
            }
          >
            <DollarSign className="h-5 w-5" />
            {isOpen && showText && (
              <span className="transition-opacity duration-300">Expenses</span>
            )}
          </NavLink>

          <NavLink
            to="/performance"
            className={({ isActive }) => 
              `flex items-center space-x-2 transition-colors duration-300 ${
                isActive 
                  ? 'text-yellow-400' 
                  : 'text-white hover:text-yellow-400'
              }`
            }
          >
            <Zap className="h-5 w-5" />
            {isOpen && showText && (
              <span className="transition-opacity duration-300">
                Performance
              </span>
            )}
          </NavLink>
        </nav>

        {/* My Devices Section (Dropdown) */}
        <div className="space-y-6 mt-8">
          <div
            className={`flex items-center space-x-2 cursor-pointer transition-colors duration-300 ${
              location.pathname.startsWith('/devices/') 
                ? 'text-yellow-400' 
                : 'text-white hover:text-yellow-400'
            }`}
            onClick={toggleDevicesDropdown}
          >
            <Smartphone className="h-5 w-5" />
            {isOpen && showText && (
              <>
                <span className="font-semibold transition-opacity duration-300">
                  My Devices
                </span>
                <span className="ml-auto">{isDevicesOpen ? '▲' : '▼'}</span>
              </>
            )}
          </div>

          {isDevicesOpen && isOpen && showText && (
            <div className="ml-6 space-y-4">
              <NavLink
                to="/devices/active"
                className={({ isActive }) => 
                  `flex items-center space-x-2 transition-colors duration-300 ${
                    isActive 
                      ? 'text-yellow-400' 
                      : 'text-gray-300 hover:text-yellow-400'
                  }`
                }
              >
                <span>Active Devices</span>
              </NavLink>
              
              <NavLink
                to="/devices/inactive"
                className={({ isActive }) => 
                  `flex items-center space-x-2 transition-colors duration-300 ${
                    isActive 
                      ? 'text-yellow-400' 
                      : 'text-gray-300 hover:text-yellow-400'
                  }`
                }
              >
                <span>Inactive Devices</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto space-y-4">
          <NavLink
            to="/account"
            className={({ isActive }) => 
              `flex items-center space-x-2 transition-colors duration-300 ${
                isActive 
                  ? 'text-yellow-400' 
                  : 'text-white hover:text-yellow-400'
              }`
            }
          >
            <User className="h-5 w-5" />
            {isOpen && showText && (
              <span className="transition-opacity duration-300">Account</span>
            )}
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) => 
              `flex items-center space-x-2 transition-colors duration-300 ${
                isActive 
                  ? 'text-yellow-400' 
                  : 'text-white hover:text-yellow-400'
              }`
            }
          >
            <Settings className="h-5 w-5" />
            {isOpen && showText && (
              <span className="transition-opacity duration-300">Settings</span>
            )}
          </NavLink>
        </div>
      </div>

      {/* Hide/Show Button */}
      <button
        onClick={toggleSidebar}
        className={`absolute top-5 right-0 transform translate-x-1/2 bg-gray-700 
          hover:bg-gray-600 text-white p-2 rounded-full shadow-md transition-all 
          duration-300 border-2 border-gray-500 
          ${isOpen ? 'opacity-100' : 'opacity-80'}`}
        style={{ zIndex: 10 }}
      >
        {isOpen ? (
          <ChevronLeft className="h-6 w-6" />
        ) : (
          <ChevronRight className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default Sidebar;