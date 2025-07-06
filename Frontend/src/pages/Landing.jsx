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
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

function Landing() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN');
  const navigate = useNavigate(); // ✅ Init navigation

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNavigation = (path) => {
    navigate(path); // ✅ Navigate to desired route
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-green-50'}`}>
      {/* Top Right Controls */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
        <button 
          onClick={toggleDarkMode}
          className="p-3 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        >
          <option value="EN">English</option>
          <option value="HI">हिन्दी</option>
        </select>
      </div>

      <div className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Illustration */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
                <div className="relative w-80 h-80 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="text-8xl">🍽️</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full text-sm font-medium mb-6 shadow-lg">
                <span className="text-2xl">🍽️</span>
                <span>Smart Meal Planning</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Meal Saver
                </span>
                <br />
                <span className="text-3xl lg:text-4xl">System</span>
              </h1>
              
              <p className="text-xl mb-4 opacity-80">
                A smarter way to reduce food waste using attendance-based meal planning.
              </p>
              
              <p className="text-lg font-medium mb-8 text-blue-600 dark:text-blue-400">
                "Plan right, serve right — every plate counts!"
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => handleNavigation('/login')}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Login</span>
                  <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={() => handleNavigation('/register')}
                  className="group px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Register</span>
                  <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={() => handleNavigation('/admin')}
                  className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Shield className="w-5 h-5" />
                  <span>Admin Panel</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-gradient-to-r from-blue-50/50 to-green-50/50 dark:from-gray-800/50 dark:to-gray-700/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Smart Features
                </span>
              </h2>
              <p className="text-lg opacity-70">Revolutionizing meal planning with intelligent automation</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Feature
                icon={Users}
                title="Smart Attendance"
                desc="Real-time student attendance sync to avoid over-prepping."
                color="blue"
              />
              <Feature
                icon={TrendingDown}
                title="Waste Reduction"
                desc="Minimize cooking surplus and reduce kitchen leftovers."
                color="green"
              />
              <Feature
                icon={Calendar}
                title="Easy Planning"
                desc="Upload menus and automate schedules with ease."
                color="purple"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Making a Difference
                </span>
              </h2>
              <p className="text-lg opacity-70">Empowering institutions to cook smarter and greener.</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <Stat number="2,500+" label="Meals Saved" color="blue" />
              <Stat number="40%" label="Waste Reduced" color="green" />
              <Stat number="150+" label="Active Users" color="purple" />
              <Stat number="98%" label="Accuracy Rate" color="orange" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="py-12 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm opacity-70 mb-2">
              © 2025 Meal Saver System. All rights reserved.
            </p>
            <p className="text-sm opacity-70">
              Crafted with ❤️ to help you save resources, reduce waste, and build a smarter kitchen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Feature Card Component
function Feature({ icon: Icon, title, desc, color }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
      <div className="relative p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
        <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${colorClasses[color]} mb-6 shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="opacity-70 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// Stats Card Component
function Stat({ number, label, color }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
      <div className="relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 text-center">
        <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
          {number}
        </div>
        <div className="text-sm opacity-70 font-medium">{label}</div>
      </div>
    </div>
  );
}

export default Landing;
