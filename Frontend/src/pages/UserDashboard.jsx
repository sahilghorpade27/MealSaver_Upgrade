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

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const tomorrowDate = getTomorrowDate();

  useEffect(() => {
    if (!regNo) {
      navigate('/login');
      return;
    }

    const fetchMenu = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/menu/${tomorrowDate}`);
        const data = await res.json();

        if (data.success) {
          setMenu(data.menu);
        } else {
          toast.info('Menu not available for tomorrow.');
          setMenu({});
        }
      } catch (err) {
        console.error('Failed to fetch menu:', err);
        toast.error('Failed to load menu data');
      }
    };

    fetchMenu();
  }, [navigate, regNo, tomorrowDate]);

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
        body: JSON.stringify({ regNo, date: tomorrowDate, ...attendance }),
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
    <div>
      <div>
        <div>
          <div>
            <ChefHat />
          </div>
          <h1>Hello, {regNo}</h1>
          <p>Mark your attendance for the next meal</p>
        </div>

        <div>
          <div>
            <h2>Next Day Menu ({tomorrowDate})</h2>
            <ul>
              <li>🍳 Breakfast: {menu.breakfast || 'Not available'}</li>
              <li>🍛 Lunch: {menu.lunch || 'Not available'}</li>
              <li>🌙 Dinner: {menu.dinner || 'Not available'}</li>
            </ul>
          </div>

          <div>
            <h2>Select Meals</h2>
            <label>
              <input
                type="checkbox"
                name="breakfast"
                checked={attendance.breakfast}
                onChange={handleCheckboxChange}
              />
              <span>Breakfast</span>
            </label>
            <label>
              <input
                type="checkbox"
                name="lunch"
                checked={attendance.lunch}
                onChange={handleCheckboxChange}
              />
              <span>Lunch</span>
            </label>
            <label>
              <input
                type="checkbox"
                name="dinner"
                checked={attendance.dinner}
                onChange={handleCheckboxChange}
              />
              <span>Dinner</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <div />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <CheckCircle />
              <span>Submit Attendance</span>
            </>
          )}
        </button>

        <button
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;