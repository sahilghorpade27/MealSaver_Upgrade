import React, { useEffect, useState } from 'react';
import { User, Calendar, LogOut, CheckCircle, Clock, Utensils, Coffee, Sun, Moon } from 'lucide-react';

function UserDashboard() {
  const [menu, setMenu] = useState(null);
  const [attendance, setAttendance] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [regNo, setRegNo] = useState(localStorage.getItem('regNo') || '');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/attendance/menu');
        const data = await res.json();
        setMenu(data);
      } catch (err) {
        alert('Menu not available yet.');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/attendance/mark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          regNo,
          ...attendance
        }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert('Attendance failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('regNo');
    window.location.href = '/login';
  };

  const getMealIcon = (meal) => {
    switch (meal) {
      case 'breakfast': return <Coffee className="w-5 h-5" />;
      case 'lunch': return <Sun className="w-5 h-5" />;
      case 'dinner': return <Moon className="w-5 h-5" />;
      default: return <Utensils className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 p-2 rounded-full">
                <User className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Meal Saver</h1>
                <p className="text-sm text-gray-600">Welcome back, {regNo}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tomorrow's Menu Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-green-100 p-2 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Tomorrow's Menu</h2>
                <p className="text-gray-600">Plan your meals for the next day</p>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-600">Loading menu...</span>
              </div>
            ) : menu ? (
              <div className="grid md:grid-cols-3 gap-4">
                {/* Breakfast */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <Coffee className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Breakfast</h3>
                  </div>
                  <p className="text-gray-700 font-medium">{menu.breakfast}</p>
                </div>

                {/* Lunch */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Sun className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Lunch</h3>
                  </div>
                  <p className="text-gray-700 font-medium">{menu.lunch}</p>
                </div>

                {/* Dinner */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Moon className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Dinner</h3>
                  </div>
                  <p className="text-gray-700 font-medium">{menu.dinner}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Utensils className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600">Menu not available yet</p>
                <p className="text-sm text-gray-500 mt-1">Please check back later</p>
              </div>
            )}
          </div>
        </div>

        {/* Attendance Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-indigo-100 p-2 rounded-full">
                <CheckCircle className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Mark Attendance</h2>
                <p className="text-gray-600">Select the meals you plan to attend</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Breakfast Checkbox */}
                <label className="relative flex items-center p-4 rounded-lg border-2 border-gray-200 hover:border-orange-300 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    className="sr-only"
                    onChange={e => setAttendance(prev => ({ ...prev, breakfast: e.target.checked }))}
                  />
                  <div className={`flex items-center space-x-3 ${attendance.breakfast ? 'text-orange-600' : 'text-gray-600'}`}>
                    <div className={`p-2 rounded-full ${attendance.breakfast ? 'bg-orange-100' : 'bg-gray-100'}`}>
                      <Coffee className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium">Breakfast</div>
                      <div className="text-sm opacity-75">Morning meal</div>
                    </div>
                  </div>
                  {attendance.breakfast && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-5 h-5 text-orange-600" />
                    </div>
                  )}
                </label>

                {/* Lunch Checkbox */}
                <label className="relative flex items-center p-4 rounded-lg border-2 border-gray-200 hover:border-green-300 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    className="sr-only"
                    onChange={e => setAttendance(prev => ({ ...prev, lunch: e.target.checked }))}
                  />
                  <div className={`flex items-center space-x-3 ${attendance.lunch ? 'text-green-600' : 'text-gray-600'}`}>
                    <div className={`p-2 rounded-full ${attendance.lunch ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium">Lunch</div>
                      <div className="text-sm opacity-75">Afternoon meal</div>
                    </div>
                  </div>
                  {attendance.lunch && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                </label>

                {/* Dinner Checkbox */}
                <label className="relative flex items-center p-4 rounded-lg border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    className="sr-only"
                    onChange={e => setAttendance(prev => ({ ...prev, dinner: e.target.checked }))}
                  />
                  <div className={`flex items-center space-x-3 ${attendance.dinner ? 'text-purple-600' : 'text-gray-600'}`}>
                    <div className={`p-2 rounded-full ${attendance.dinner ? 'bg-purple-100' : 'bg-gray-100'}`}>
                      <Moon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium">Dinner</div>
                      <div className="text-sm opacity-75">Evening meal</div>
                    </div>
                  </div>
                  {attendance.dinner && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    </div>
                  )}
                </label>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center space-x-3 px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Mark Attendance</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;