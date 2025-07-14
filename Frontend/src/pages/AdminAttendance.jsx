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
          percentage: getAttendancePercentage(data.breakfast, data.total)
        },
        {
          name: 'Lunch',
          count: data.lunch,
          icon: Utensils,
          percentage: getAttendancePercentage(data.lunch, data.total)
        },
        {
          name: 'Dinner',
          count: data.dinner,
          icon: Moon,
          percentage: getAttendancePercentage(data.dinner, data.total)
        }
      ]
    : [];

  return (
    <div>
      <div>
        {/* Header */}
        <div>
          <div>
            <div>
              <BarChart3 />
            </div>
            <div>
              <h1>Attendance Dashboard</h1>
              <p>Meal attendance summary and statistics</p>
            </div>
          </div>
          <button onClick={() => navigate('/admin/upload-menu')}>
            <ArrowLeft />
            <span>Back to Admin Panel</span>
          </button>
        </div>

        {/* Date Picker */}
        <div>
          <div>
            <div>
              <Calendar />
            </div>
            <div>
              <h2>Select Date</h2>
              <p>Choose a date to view attendance data</p>
            </div>
          </div>
          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={fetchData} disabled={loading}>
              <RefreshCw />
              <span>Refresh</span>
            </button>
          </div>
          <div>
            <p>
              <strong>Selected Date:</strong> {formatDate(date)}
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div>
            <div>
              <div>Loading...</div>
              <p>Loading attendance data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div>
              <div>
                <div>
                  <p>Total Users</p>
                  <p>{data?.total || 0}</p>
                </div>
                <div>
                  <Users />
                </div>
              </div>
              <div>
                <TrendingUp />
                <span>Registered users</span>
              </div>

              {mealData.map((meal, index) => (
                <div key={index}>
                  <div>
                    <div>
                      <p>{meal.name}</p>
                      <p>{meal.count}</p>
                    </div>
                    <div>
                      <meal.icon />
                    </div>
                  </div>
                  <div>
                    <div>
                      <span>Attendance Rate</span>
                      <span>{meal.percentage}%</span>
                    </div>
                    <div>
                      <div style={{ width: `${meal.percentage}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div>
              <div>
                <BarChart3 />
                <h3>Detailed Summary</h3>
              </div>
              <div>
                {/* Left: Meal Stats */}
                <div>
                  <h4>Meal Statistics</h4>
                  {mealData.map((meal, index) => (
                    <div key={index}>
                      <div>
                        <meal.icon />
                        <span>{meal.name}</span>
                      </div>
                      <div>
                        <p>{meal.count} attendees</p>
                        <p>{meal.percentage}% of total</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Additional Info */}
                <div>
                  <h4>Additional Information</h4>
                  <div>
                    <div>
                      <span>Most Popular Meal</span>
                      <span>
                        {mealData.length > 0
                          ? mealData.reduce((prev, curr) =>
                              prev.count > curr.count ? prev : curr
                            ).name
                          : 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span>Total Meals Served</span>
                      <span>
                        {data ? data.breakfast + data.lunch + data.dinner : 0}
                      </span>
                    </div>
                    <div>
                      <span>Overall Attendance</span>
                      <span>
                        {data
                          ? ((data.breakfast + data.lunch + data.dinner) / (data.total * 3) * 100).toFixed(1)
                          : 0}%
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