import React from 'react';

const InactiveDevicesPage = ({ darkMode }) => {

    // Dummy data for inactive devices

    const inactiveDevices = [

        { id: 1, name: 'Solar Panel 3', type: 'Photovoltaic', power: '250 W', status: 'Inactive', lastActive: '5 days ago', issue: 'Connection lost' },

        { id: 2, name: 'Inverter 2', type: 'Inverter', power: '500 W', status: 'Maintenance', lastActive: '3 days ago', issue: 'Scheduled maintenance' },

        { id: 3, name: 'Battery 2', type: 'Storage', power: '5 kWh', status: 'Fault', lastActive: '1 day ago', issue: 'Low voltage' },

    ];

    return (

        <div className={`p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>

            <div className="max-w-6xl mx-auto">

                <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>

                    Inactive Devices

                </h1>

                <div className={`rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

                    <div className="overflow-x-auto">

                        <table className="min-w-full divide-y divide-gray-200">

                            <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>

                                <tr>

                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">

                                        <span className={darkMode ? 'text-gray-300' : 'text-gray-500'}>Device Name</span>

                                    </th>

                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">

                                        <span className={darkMode ? 'text-gray-300' : 'text-gray-500'}>Type</span>

                                    </th>

                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">

                                        <span className={darkMode ? 'text-gray-300' : 'text-gray-500'}>Power/Capacity</span>

                                    </th>

                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">

                                        <span className={darkMode ? 'text-gray-300' : 'text-gray-500'}>Status</span>

                                    </th>

                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">

                                        <span className={darkMode ? 'text-gray-300' : 'text-gray-500'}>Last Active</span>

                                    </th>

                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">

                                        <span className={darkMode ? 'text-gray-300' : 'text-gray-500'}>Issue</span>

                                    </th>

                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">

                                        <span className={darkMode ? 'text-gray-300' : 'text-gray-500'}>Actions</span>

                                    </th>

                                </tr>

                            </thead>

                            <tbody className={`divide-y ${darkMode ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}`}>

                                {inactiveDevices.map((device) => (

                                    <tr key={device.id} className={darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}>

                                        <td className="px-6 py-4 whitespace-nowrap">

                                            <div className="flex items-center">

                                                <div className="flex-shrink-0 h-10 w-10">

                                                    <div className={`rounded-full h-10 w-10 flex items-center justify-center ${device.type === 'Photovoltaic' ? 'bg-blue-100 text-blue-800' :

                                                            device.type === 'Inverter' ? 'bg-green-100 text-green-800' :

                                                                'bg-yellow-100 text-yellow-800'

                                                        }`}>

                                                        {device.type.charAt(0)}

                                                    </div>

                                                </div>

                                                <div className="ml-4">

                                                    <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>

                                                        {device.name}

                                                    </div>

                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">

                                            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{device.type}</div>

                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">

                                            <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>

                                                {device.power}

                                            </div>

                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">

                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${device.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :

                                                    device.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :

                                                        'bg-red-100 text-red-800'

                                                }`}>

                                                {device.status}

                                            </span>

                                        </td>

                                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>

                                            {device.lastActive}

                                        </td>

                                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-red-300' : 'text-red-600'}`}>

                                            {device.issue}

                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">

                                            <button className={`mr-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'}`}>

                                                Reconnect

                                            </button>

                                            <button className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'}`}>

                                                Report

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

    );

};

export default InactiveDevicesPage;

