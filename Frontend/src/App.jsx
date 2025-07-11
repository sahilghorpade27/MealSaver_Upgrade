import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import UploadMenu from './pages/UploadMenu';
import UserDashboard from './pages/UserDashboard';
import AdminAttendance from './pages/AdminAttendance';
import Landing from './pages/Landing';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/upload-menu" element={<UploadMenu />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/admin/attendance" element={<AdminAttendance />} />

    </Routes>
  );
}

export default App;
