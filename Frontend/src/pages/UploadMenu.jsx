import React, { useState } from 'react';
import axios from 'axios';

function UploadMenu() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    date: dateStr,
    breakfast: '',
    lunch: '',
    dinner: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/upload-menu', formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload Menu for {formData.date}</h2>
      <form onSubmit={handleSubmit}>
        <input name="breakfast" placeholder="Breakfast" onChange={handleChange} required /><br />
        <input name="lunch" placeholder="Lunch" onChange={handleChange} required /><br />
        <input name="dinner" placeholder="Dinner" onChange={handleChange} required /><br />
        <button type="submit">Upload Menu</button>
      </form>
    </div>
  );
}

export default UploadMenu;
