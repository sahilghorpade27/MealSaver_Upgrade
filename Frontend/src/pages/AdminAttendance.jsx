import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminAttendance() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/meal-counts?date=${date}`);
      setData(res.data);
    } catch (err) {
      alert('Failed to load attendance summary');
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Attendance Summary</h2>
      <label>Select Date: </label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <br /><br />
      {data ? (
        <div>
          <p><strong>Total Users:</strong> {data.total}</p>
          <p><strong>Breakfast:</strong> {data.breakfast}</p>
          <p><strong>Lunch:</strong> {data.lunch}</p>
          <p><strong>Dinner:</strong> {data.dinner}</p>
        </div>
      ) : <p>Loading data...</p>}
    </div>
  );
}

export default AdminAttendance;
