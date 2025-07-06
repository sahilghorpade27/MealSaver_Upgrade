import React, { useEffect, useState } from 'react';
import { ChefHat, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserDashboard() {
  const [menu, setMenu] = useState({});
  const [attendance, setAttendance] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const regNo = localStorage.getItem('regNo');

  useEffect(() => {
    if (!regNo) {
      navigate('/login');
      return;
    }

    const fetchMenu = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/attendance/menu');
        const data = await res.json();
        setMenu(data);
      } catch (err) {
        console.error('Failed to fetch menu:', err);
        toast.error('Failed to load menu data');
      }
    };

    fetchMenu();
  }, [navigate, regNo]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAttendance((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async () => {
    if (!attendance.breakfast && !attendance.lunch && !attendance.dinner) {
      toast.warning('Please select at least one meal to mark attendance.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/attendance/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regNo, ...attendance }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Attendance marked successfully!');
        setAttendance({ breakfast: false, lunch: false, dinner: false });
      } else {
        toast.error(data.message || 'Failed to mark attendance.');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('regNo');
    toast.info('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <ChefHat className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Hello, {regNo}</h1>
          <p className="text-gray-600">Mark your attendance for the next meal</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="font-semibold text-gray-700 mb-2">Next Day Menu</h2>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>🍳 Breakfast: {menu.breakfast || 'Loading...'}</li>
              <li>🍛 Lunch: {menu.lunch || 'Loading...'}</li>
              <li>🌙 Dinner: {menu.dinner || 'Loading...'}</li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h2 className="font-semibold text-gray-700 mb-2">Select Meals</h2>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="breakfast"
                checked={attendance.breakfast}
                onChange={handleCheckboxChange}
                className="rounded text-green-600 focus:ring-green-500"
              />
              <span>Breakfast</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="lunch"
                checked={attendance.lunch}
                onChange={handleCheckboxChange}
                className="rounded text-green-600 focus:ring-green-500"
              />
              <span>Lunch</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="dinner"
                checked={attendance.dinner}
                onChange={handleCheckboxChange}
                className="rounded text-green-600 focus:ring-green-500"
              />
              <span>Dinner</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full flex justify-center items-center space-x-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Submit Attendance</span>
            </>
          )}
        </button>

        <button
          onClick={handleLogout}
          className="mt-6 text-sm text-gray-500 hover:text-gray-700 block text-center w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;
