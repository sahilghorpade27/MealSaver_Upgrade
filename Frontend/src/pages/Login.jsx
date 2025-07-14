import React, { useState } from 'react';
import { ChefHat, User, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [formData, setFormData] = useState({ regNo: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await axios.post('/api/users/login', formData);

      if (res.data.success) {
        localStorage.setItem('regNo', formData.regNo);
        toast.success('Login successful! Welcome to Meal Saver!');
        console.log('Navigating to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        toast.error(res.data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Login failed. Please check your credentials or try again later.');
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
            <ChefHat />
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to your Meal Saver account</p>
        </div>

        {/* Login Card */}
        <div>
          <form onSubmit={handleSubmit}>
            {/* Registration Number */}
            <div>
              <label>
                <User />
                <span>Registration Number</span>
              </label>
              <input
                type="text"
                name="regNo"
                value={formData.regNo}
                onChange={handleChange}
                placeholder="Enter your registration number"
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
                  placeholder="Enter your password"
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
                  <div></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <ChefHat />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div>
            <p>
              Don't have an account?{' '}
              <button onClick={() => navigate('/register')}>
                Create one here
              </button>
            </p>
          </div>

          <div>
            <button>
              Forgot your password?
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
      </div>
    </div>
  );
}

export default Login;