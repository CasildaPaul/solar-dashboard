import React, { useState } from 'react';

const AccountPage = ({ darkMode }) => {
  // State for modals and forms
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePlan, setShowChangePlan] = useState(false);
  const [showCancelSubscription, setShowCancelSubscription] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  // Dummy account data
  const [userProfile, setUserProfile] = useState({
    name: "John Solaris",
    email: "john.solaris@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Solar Street, Sun Valley, CA 90210",
    joinDate: "January 15, 2023",
    lastLogin: "June 3, 2025 18:45 PST"
  });

  const subscriptionData = {
    plan: "Premium Solar Pro",
    status: "Active",
    renewalDate: "July 15, 2025",
    devices: 12,
    maxDevices: 15,
    features: ["Real-time Monitoring", "Historical Analytics", "Expense Tracking", "Priority Support"]
  };

  const billingHistory = [
    { id: 1, date: "2025-05-15", amount: "$49.99", status: "Paid" },
    { id: 2, date: "2025-04-15", amount: "$49.99", status: "Paid" },
    { id: 3, date: "2025-03-15", amount: "$49.99", status: "Paid" },
    { id: 4, date: "2025-02-15", amount: "$49.99", status: "Refunded" },
  ];

  const plans = [
    { name: "Basic Solar", price: "$19.99", devices: 5, features: ["Basic Monitoring", "Monthly Reports"] },
    { name: "Premium Solar Pro", price: "$49.99", devices: 15, features: ["Real-time Monitoring", "Historical Analytics", "Expense Tracking", "Priority Support"] },
    { name: "Enterprise Solar", price: "$99.99", devices: 50, features: ["All Premium Features", "Custom Analytics", "API Access", "24/7 Support"] }
  ];

  // Handler functions
  const handleEditProfile = () => {
    setEditedProfile({ ...userProfile });
    setShowEditProfile(true);
  };

  const handleSaveProfile = () => {
    setUserProfile({ ...editedProfile });
    setShowEditProfile(false);
    alert('Profile updated successfully!');
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleChangePlan = () => {
    setShowChangePlan(true);
  };

  const handleSelectPlan = (planName) => {
    setShowChangePlan(false);
    alert(`Plan changed to ${planName}!`);
  };

  const handleCancelSubscription = () => {
    setShowCancelSubscription(true);
  };

  const confirmCancelSubscription = () => {
    setShowCancelSubscription(false);
    alert('Subscription cancelled. You will receive a confirmation email shortly.');
  };

  const handleDownloadInvoice = (date, amount) => {
    // Simulate PDF download
    alert(`Downloading invoice for ${date} - ${amount}`);
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
              <button
                onClick={onClose}
                className={`text-gray-400 hover:text-gray-600 ${darkMode ? 'hover:text-gray-300' : ''}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Account Settings
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Profile Information */}
          <div className={`rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-semibold flex items-center ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Profile Information
              </h2>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userProfile.name}</h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Solar System Owner</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {Object.entries(userProfile).slice(1).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {key.charAt(0).toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1)}:
                    </span>
                    <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={handleEditProfile}
                className={`mt-6 px-4 py-2 rounded-lg font-medium transition-colors ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                Edit Profile
              </button>
            </div>
          </div>
          
          {/* Subscription Details */}
          <div className={`rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-semibold flex items-center ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Subscription Details
              </h2>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {subscriptionData.plan}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${subscriptionData.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {subscriptionData.status}
                </span>
              </div>
              
              <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Renewal Date</span>
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{subscriptionData.renewalDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Connected Devices</span>
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {subscriptionData.devices}/{subscriptionData.maxDevices}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(subscriptionData.devices / subscriptionData.maxDevices) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <h4 className={`font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Plan Features:</h4>
              <ul className="grid grid-cols-2 gap-2 mb-6">
                {subscriptionData.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex space-x-3">
                <button 
                  onClick={handleChangePlan}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                >
                  Change Plan
                </button>
                <button 
                  onClick={handleCancelSubscription}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
                >
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Billing History */}
        <div className={`rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              Billing History
            </h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-500'}`}>
                      Date
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-500'}`}>
                      Amount
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-500'}`}>
                      Status
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-500'}`}>
                      Invoice
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}`}>
                  {billingHistory.map((item) => (
                    <tr key={item.id} className={darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {item.date}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        <button 
                          onClick={() => handleDownloadInvoice(item.date, item.amount)}
                          className="hover:underline transition-colors"
                        >
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal 
        isOpen={showEditProfile} 
        onClose={() => setShowEditProfile(false)} 
        title="Edit Profile"
      >
        <div className="space-y-4">
          {Object.entries(editedProfile).slice(0, 4).map(([key, value]) => (
            <div key={key}>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {key.charAt(0).toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1)}
              </label>
              <input
                type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          ))}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSaveProfile}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={() => setShowEditProfile(false)}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Change Plan Modal */}
      <Modal 
        isOpen={showChangePlan} 
        onClose={() => setShowChangePlan(false)} 
        title="Change Subscription Plan"
      >
        <div className="space-y-4">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                plan.name === subscriptionData.plan 
                  ? (darkMode ? 'border-blue-500 bg-blue-900/20' : 'border-blue-500 bg-blue-50')
                  : (darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400')
              }`}
              onClick={() => handleSelectPlan(plan.name)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <span className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{plan.price}/mo</span>
              </div>
              <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Up to {plan.devices} devices
              </p>
              <ul className="text-sm space-y-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>• {feature}</li>
                ))}
              </ul>
              {plan.name === subscriptionData.plan && (
                <div className="mt-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Current Plan</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal>

      {/* Cancel Subscription Modal */}
      <Modal 
        isOpen={showCancelSubscription} 
        onClose={() => setShowCancelSubscription(false)} 
        title="Cancel Subscription"
      >
        <div>
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Are you sure you want to cancel your subscription? This action cannot be undone and you will lose access to all premium features.
          </p>
          <p className={`mb-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Your subscription will remain active until {subscriptionData.renewalDate}.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={confirmCancelSubscription}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Yes, Cancel Subscription
            </button>
            <button
              onClick={() => setShowCancelSubscription(false)}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Keep Subscription
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AccountPage;