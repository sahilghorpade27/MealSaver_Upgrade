import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [menu, setMenu] = useState(null);
  const [attendance, setAttendance] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const [regNo, setRegNo] = useState(localStorage.getItem('regNo') || '');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/attendance/menu');
        setMenu(res.data);
      } catch (err) {
        alert('Menu not available yet.');
      }
    };
    fetchMenu();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/attendance/mark', {
        regNo,
        ...attendance
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Attendance failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Dashboard</h2>
      <p>Welcome, {regNo}</p>
      <h3>Tomorrow’s Menu:</h3>
      {menu ? (
        <ul>
          <li><strong>Breakfast:</strong> {menu.breakfast}</li>
          <li><strong>Lunch:</strong> {menu.lunch}</li>
          <li><strong>Dinner:</strong> {menu.dinner}</li>
        </ul>
      ) : <p>Loading menu...</p>}

      <form onSubmit={handleSubmit}>
        <label>
          <input type="checkbox" onChange={e => setAttendance(prev => ({ ...prev, breakfast: e.target.checked }))} />
          Breakfast
        </label><br />
        <label>
          <input type="checkbox" onChange={e => setAttendance(prev => ({ ...prev, lunch: e.target.checked }))} />
          Lunch
        </label><br />
        <label>
          <input type="checkbox" onChange={e => setAttendance(prev => ({ ...prev, dinner: e.target.checked }))} />
          Dinner
        </label><br /><br />
        <button type="submit">Mark Attendance</button>
      </form>
    </div>
  );
}

export default UserDashboard;
