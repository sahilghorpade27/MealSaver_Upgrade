import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    regNo: '',
    name: '',
    year: '',
    mobile: '',
    password: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input name="regNo" placeholder="Reg No" onChange={handleChange} required /><br />
        <input name="name" placeholder="Name" onChange={handleChange} required /><br />
        <input name="year" placeholder="Year (1st/2nd/3rd)" onChange={handleChange} required /><br />
        <input name="mobile" placeholder="Mobile" onChange={handleChange} required /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
