import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Users,
  Coffee,
  Utensils,
  Moon,
  BarChart3,
  RefreshCw,
  ArrowLeft,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AdminAttendance() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulated API call (replace this with actual fetch)
      await new Promise(resolve => setTimeout(resolve, 1000));
      const sampleData = {
        total: 150,
        breakfast: 120,
        lunch: 145,
        dinner: 130
      };
      setData(sampleData);
    } catch (err) {
      alert('Failed to load attendance summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const getAttendancePercentage = (mealCount, total) => {
    return total > 0 ? ((mealCount / total) * 100).toFixed(1) : 0;
  };

  const mealData = data
    ? [
        {
          name: 'Breakfast',
          count: data.breakfast,
          icon: Coffee,
          color: 'bg-orange-500',
          lightColor: 'bg-orange-50',
          textColor: 'text-orange-600',
          percentage: getAttendancePercentage(data.breakfast, data.total)
        },
        {
          name: 'Lunch',
          count: data.lunch,
          icon: Utensils,
          color: 'bg-green-500',
          lightColor: 'bg-green-50',
          textColor: 'text-green-600',
          percentage: getAttendancePercentage(data.lunch, data.total)
        },
        {
          name: 'Dinner',
          count: data.dinner,
          icon: Moon,
          color: 'bg-purple-500',
          lightColor: 'bg-purple-50',
          textColor: 'text-purple-600',
          percentage: getAttendancePercentage(data.dinner, data.total)
        }
      ]
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Attendance Dashboard</h1>
                <p className="text-gray-600">Meal attendance summary and statistics</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/admin/upload-menu')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Admin Panel</span>
            </button>
          </div>
        </div>

        {/* Date Picker */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Select Date</h2>
                <p className="text-sm text-gray-600">Choose a date to view attendance data</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              />
              <button
                onClick={fetchData}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Selected Date:</strong> {formatDate(date)}
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading attendance data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">{data?.total || 0}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Registered users</span>
                </div>
              </div>

              {mealData.map((meal, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{meal.name}</p>
                      <p className="text-3xl font-bold text-gray-900">{meal.count}</p>
                    </div>
                    <div className={`${meal.lightColor} p-3 rounded-full`}>
                      <meal.icon className={`w-6 h-6 ${meal.textColor}`} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Attendance Rate</span>
                      <span className={`text-sm font-medium ${meal.textColor}`}>
                        {meal.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${meal.color}`}
                        style={{ width: `${meal.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-purple-100 p-2 rounded-full">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Detailed Summary</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Meal Stats */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 mb-3">Meal Statistics</h4>
                  {mealData.map((meal, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div className={`${meal.lightColor} p-2 rounded-full`}>
                          <meal.icon className={`w-4 h-4 ${meal.textColor}`} />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{meal.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{meal.count} attendees</p>
                        <p className={`text-xs ${meal.textColor}`}>{meal.percentage}% of total</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Additional Info */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 mb-3">Additional Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Most Popular Meal</span>
                      <span className="text-sm font-medium text-gray-900">
                        {mealData.length > 0
                          ? mealData.reduce((prev, curr) =>
                              prev.count > curr.count ? prev : curr
                            ).name
                          : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Total Meals Served</span>
                      <span className="text-sm font-medium text-gray-900">
                        {data ? data.breakfast + data.lunch + data.dinner : 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Overall Attendance</span>
                      <span className="text-sm font-medium text-green-600">
                        {data
                          ? ((data.breakfast + data.lunch + data.dinner) / (data.total * 3) * 100).toFixed(1)
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminAttendance;
