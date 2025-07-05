import React, { useState } from 'react';
import {
  ArrowRightCircle,
  Users,
  TrendingDown,
  Calendar,
  Shield,
  Moon,
  Sun,
} from 'lucide-react';
import illustration from '../assets/meal.svg'; // Place undraw image here

function Landing() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN');

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
  };

  const handleNavigation = (path) => {
    alert(`Navigating to: ${path}`);
    console.log(`Navigation to: ${path}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-6 py-10">
      {/* Top Right Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full p-2 shadow hover:shadow-md transition"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {/* Language Switch */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm dark:text-white"
        >
          <option value="EN">English</option>
          <option value="HI">हिन्दी</option>
        </select>
      </div>

      <div className="max-w-5xl w-full">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center bg-white dark:bg-gray-900 p-10 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 mb-10">
          {/* Illustration */}
          <img
            src={illustration}
            alt="Meal planning"
            className="rounded-xl w-full h-auto"
          />

          <div className="text-center md:text-left">
            <div className="bg-indigo-100 dark:bg-indigo-700 rounded-full p-4 w-20 h-20 mx-auto md:mx-0 mb-4">
              <span className="text-4xl">🍽️</span>
            </div>
            <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-white mb-4">
              Meal Saver System
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              A smarter way to reduce food waste using attendance-based meal planning.
            </p>
            <p className="text-sm text-gray-500 italic dark:text-gray-400 mb-6">
              "Plan right, serve right — every plate counts!"
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-6">
              <button
                onClick={() => handleNavigation('/login')}
                className="flex items-center justify-center space-x-3 px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition transform hover:scale-105 active:scale-95"
              >
                <span>Login</span>
                <ArrowRightCircle className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleNavigation('/register')}
                className="flex items-center justify-center space-x-3 px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition transform hover:scale-105 active:scale-95"
              >
                <span>Register</span>
                <ArrowRightCircle className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleNavigation('/admin')}
                className="flex items-center justify-center space-x-3 px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 shadow-md hover:shadow-lg"
              >
                <Shield className="w-5 h-5" />
                <span>Admin Panel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Feature
            icon={Users}
            title="Smart Attendance"
            color="blue"
            desc="Real-time student attendance sync to avoid over-prepping."
          />
          <Feature
            icon={TrendingDown}
            title="Waste Reduction"
            color="green"
            desc="Minimize cooking surplus and reduce kitchen leftovers."
          />
          <Feature
            icon={Calendar}
            title="Easy Planning"
            color="purple"
            desc="Upload menus and automate schedules with ease."
          />
        </div>

        {/* Stats */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Making a Difference
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Empowering institutions to cook smarter and greener.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <Stat number="2,500+" label="Meals Saved" color="indigo" />
            <Stat number="40%" label="Waste Reduced" color="green" />
            <Stat number="150+" label="Active Users" color="purple" />
            <Stat number="98%" label="Accuracy Rate" color="blue" />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-gray-500 dark:text-gray-400 text-sm">
          <p className="mb-1">© 2025 Meal Saver System. All rights reserved.</p>
          <p>
            Crafted with ❤️ to help you save resources, reduce waste, and build a
            smarter kitchen.
          </p>
        </div>
      </div>
    </div>
  );
}

// Feature Card Component
function Feature({ icon: Icon, title, color, desc }) {
  const bgColor = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
    green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300',
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
      <div className={`${bgColor[color]} rounded-full p-3 w-12 h-12 mb-4`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
    </div>
  );
}

// Stats Card Component
function Stat({ number, label, color }) {
  const textColor = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
  };

  return (
    <div>
      <div className={`text-3xl font-bold ${textColor[color]} mb-1`}>
        {number}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>
    </div>
  );
}

export default Landing;
