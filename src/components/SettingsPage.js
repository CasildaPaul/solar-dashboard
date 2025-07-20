import React, { useState } from 'react';

const SettingsPage = ({ darkMode }) => {
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    pushNotifications: true,
    monthlyReports: true,
    systemUpdates: false,
    outageWarnings: true,
    performanceThreshold: 75
  });

  // System configuration state
  const [systemConfig, setSystemConfig] = useState({
    timeZone: "America/Los_Angeles",
    unitSystem: "imperial",
    dataRetention: "3 years",
    autoUpdate: true,
    theme: "system"
  });

  // Handle notification toggle
  const handleNotificationToggle = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  // Handle system config changes
  const handleSystemConfigChange = (field, value) => {
    setSystemConfig({
      ...systemConfig,
      [field]: value
    });
  };

  return (
    <div className={`p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          System Settings
        </h1>
        
        <div className="grid grid-cols-1 gap-8 mb-12">
          {/* Notification Preferences */}
          <div className={`rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-semibold flex items-center ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                Notification Preferences
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => {
                  if (key === 'performanceThreshold') return null;
                  
                  return (
                    <div key={key} className="flex justify-between items-center">
                      <div>
                        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {key === 'emailAlerts' && "Receive alerts via email"}
                          {key === 'pushNotifications' && "Get push notifications on mobile"}
                          {key === 'monthlyReports' && "Monthly generation reports"}
                          {key === 'systemUpdates' && "System maintenance notifications"}
                          {key === 'outageWarnings' && "Grid outage warnings"}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleNotificationToggle(key)}
                        className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                          value ? (darkMode ? 'bg-blue-600' : 'bg-blue-500') : (darkMode ? 'bg-gray-600' : 'bg-gray-200')
                        }`}
                      >
                        <span 
                          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                            value ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
              
              {/* Performance Threshold Slider */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex justify-between mb-2">
                  <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Performance Threshold Alert
                  </h3>
                  <span className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {notificationSettings.performanceThreshold}%
                  </span>
                </div>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Receive alerts when solar generation falls below this percentage of expected output
                </p>
                <input 
                  type="range" 
                  min="50" 
                  max="95" 
                  value={notificationSettings.performanceThreshold}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    performanceThreshold: parseInt(e.target.value)
                  })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>50%</span>
                  <span>95%</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* System Configuration */}
          <div className={`rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-semibold flex items-center ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                System Configuration
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Time Zone Selector */}
                <div>
                  <h3 className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                    Time Zone
                  </h3>
                  <select
                    value={systemConfig.timeZone}
                    onChange={(e) => handleSystemConfigChange('timeZone', e.target.value)}
                    className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border rounded-md focus:outline-none sm:text-sm ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                  </select>
                </div>
                
                {/* Unit System */}
                <div>
                  <h3 className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                    Unit System
                  </h3>
                  <div className="mt-1 flex space-x-4">
                    {['imperial', 'metric'].map((unit) => (
                      <label key={unit} className="flex items-center">
                        <input
                          type="radio"
                          name="unitSystem"
                          checked={systemConfig.unitSystem === unit}
                          onChange={() => handleSystemConfigChange('unitSystem', unit)}
                          className={`h-4 w-4 focus:ring-blue-500 ${
                            darkMode ? 'text-blue-600 border-gray-600' : 'border-gray-300'
                          }`}
                        />
                        <span className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {unit === 'imperial' ? 'Imperial (Fahrenheit, Miles)' : 'Metric (Celsius, Kilometers)'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Data Retention */}
                <div>
                  <h3 className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                    Data Retention Period
                  </h3>
                  <select
                    value={systemConfig.dataRetention}
                    onChange={(e) => handleSystemConfigChange('dataRetention', e.target.value)}
                    className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border rounded-md focus:outline-none sm:text-sm ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                  >
                    <option>1 year</option>
                    <option>2 years</option>
                    <option>3 years</option>
                    <option>5 years</option>
                    <option>Indefinitely</option>
                  </select>
                  <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    How long to keep your historical generation data
                  </p>
                </div>
                
                {/* Auto Updates */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <div>
                    <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Automatic System Updates
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Keep your solar monitoring system up-to-date automatically
                    </p>
                  </div>
                  <button 
                    onClick={() => handleSystemConfigChange('autoUpdate', !systemConfig.autoUpdate)}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                      systemConfig.autoUpdate ? (darkMode ? 'bg-blue-600' : 'bg-blue-500') : (darkMode ? 'bg-gray-600' : 'bg-gray-200')
                    }`}
                  >
                    <span 
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        systemConfig.autoUpdate ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-8 pt-6 flex justify-end space-x-3">
                <button className={`px-4 py-2 rounded-lg font-medium ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} text-gray-800`}>
                  Reset to Defaults
                </button>
                <button className={`px-4 py-2 rounded-lg font-medium ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;