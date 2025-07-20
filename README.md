# Solar Dashboard

A comprehensive solar energy management system built with React that provides real-time monitoring, performance analytics, and expense tracking for solar installations.

## Features

- **Real-time Generation Monitoring** - Live solar power generation tracking
- **Performance Analytics** - System efficiency and health monitoring
- **Expense Tracking** - Cost analysis and savings calculations
- **Device Management** - Active and inactive device monitoring
- **User Account Management** - Profile and subscription management
- **Dark/Light Theme** - Toggle between dark and light modes
- **Responsive Design** - Works on desktop and mobile devices

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

## Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd solar-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Running the Project

1. **Start the development server**
   ```bash
   npm start
   ```

2. **Open your browser**
   - The application will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, navigate to `http://localhost:3000` in your browser

## Login Credentials

- **Email:** admin@gmail.com
- **Password:** admin1125

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # React components
│   ├── LoginPage.js    # Authentication page
│   ├── SolarDashboard.js # Main dashboard container
│   ├── Sidebar.js      # Navigation sidebar
│   ├── GenerationPage.js # Solar generation monitoring
│   ├── ExpensePage.js  # Expense tracking
│   ├── PerformancePage.js # Performance analytics
│   ├── AccountPage.js  # User account management
│   ├── SettingsPage.js # System settings
│   └── ...            # Other components
├── App.js              # Main App component
├── index.js           # Entry point
└── index.css          # Global styles
```

## Technologies Used

- **React** - Frontend framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Chart.js** - Additional charting

## Troubleshooting

If you encounter any issues:

1. **Clear npm cache**
   ```bash
   npm cache clean --force
   ```

2. **Delete node_modules and reinstall**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check Node.js version**
   ```bash
   node --version
   npm --version
   ```

## Support

For any issues or questions, please check the console for error messages and ensure all dependencies are properly installed.