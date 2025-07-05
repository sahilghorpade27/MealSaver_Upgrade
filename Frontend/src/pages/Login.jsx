import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/users/login', {
      regNo, password
    });

    alert('Login successful!');
    console.log(res.data.user);

    
    localStorage.setItem('regNo', res.data.user.regNo);

    // 🔄 Redirect to dashboard:
    navigate('/dashboard');
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
  }
};


  return (
    <div style={{ padding: '20px' }}>
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Reg No"
          value={regNo}
          onChange={e => setRegNo(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
