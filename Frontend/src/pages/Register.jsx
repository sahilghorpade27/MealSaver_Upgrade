import React, { useState } from 'react';
import {
  UserPlus,
  User,
  Calendar,
  Phone,
  Lock,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    regNo: '',
    name: '',
    year: '',
    mobile: '',
    password: '',
  });

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
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        alert(data.message || 'Registered successfully!');
        setFormData({
          regNo: '',
          name: '',
          year: '',
          mobile: '',
          password: '',
        });
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  return (
    <div>
      <div>
        {/* Header */}
        <div>
          <div>
            <UserPlus />
          </div>
          <h1>Create Account</h1>
          <p>Join Meal Saver to manage your daily meals</p>
        </div>

        {/* Registration Card */}
        <div>
          {/* Success Message */}
          {success && (
            <div>
              <div>
                <CheckCircle />
                <p>Registration successful!</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <InputField
              icon={CreditCard}
              label="Registration Number"
              name="regNo"
              value={formData.regNo}
              onChange={handleChange}
              placeholder="Enter your registration number"
              type="text"
              required
            />

            <InputField
              icon={User}
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              type="text"
              required
            />

            {/* Year Dropdown */}
            <div>
              <label>
                <Calendar />
                <span>Academic Year</span>
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <option value="">Select your year</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              icon={Phone}
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your 10-digit mobile number"
              type="tel"
              required
            />

            {/* Password Field */}
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
                  placeholder="Create a strong password"
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div>
            <p>
              Already have an account?{' '}
              <button onClick={() => navigate('/login')}>
                Sign in here
              </button>
            </p>
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

// Reusable InputField Component
function InputField({ icon: Icon, label, name, value, onChange, placeholder, type, required }) {
  return (
    <div>
      <label>
        <Icon />
        <span>{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default Register;