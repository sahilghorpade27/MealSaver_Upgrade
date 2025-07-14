import React, { useState } from 'react';
import { Shield, User, Lock, ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store admin data
      localStorage.setItem('admin', formData.username);

      setSuccess(true);
      alert('Admin login successful! Welcome to the admin panel.');
      console.log('Admin login successful for:', formData.username);

      // Navigate to admin dashboard
      setTimeout(() => navigate('/admin/upload-menu'), 1000);
    } catch (err) {
      alert('Admin login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div>
        {/* Header */}
        <div>
          <div>
            <Shield />
          </div>
          <h1>Admin Access</h1>
          <p>Sign in to the admin panel</p>
        </div>

        {/* Login Card */}
        <div>
          {success && (
            <div>
              <div>
                <CheckCircle />
                <p>Admin login successful!</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label>
                <User />
                <span>Username</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter admin username"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label>
                <Lock />
                <span>Password</span>
              </label>
              <div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <div>Authenticating...</div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield />
                  <span>Access Admin Panel</span>
                </>
              )}
            </button>
          </form>

          {/* User Login Link */}
          <div>
            <p>
              Not an admin?{' '}
              <button onClick={() => navigate('/login')}>
                User login here
              </button>
            </p>
          </div>

          {/* Forgot Password */}
          <div>
            <button>
              Contact system administrator
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div>
          <button onClick={() => navigate('/')}>
            <ArrowLeft />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Admin Security Note */}
        <div>
          <div>
            <div>
              <Shield />
            </div>
            <div>
              <h3>Admin Security Notice</h3>
              <ul>
                <li>• This is a restricted admin area</li>
                <li>• Only authorized administrators can access this panel</li>
                <li>• All admin activities are logged for security</li>
                <li>• Contact IT support if you need access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;