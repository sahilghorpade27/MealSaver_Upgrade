import React, { useState } from 'react';
import {
  Upload,
  Calendar,
  Coffee,
  Sun,
  Moon,
  CheckCircle,
  ArrowLeft,
  Shield,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function UploadMenu() {
  const navigate = useNavigate();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    date: dateStr,
    breakfast: '',
    lunch: '',
    dinner: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('http://localhost:5000/api/admin/upload-menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        alert(data.message || 'Menu uploaded successfully!');
        setFormData({
          date: dateStr,
          breakfast: '',
          lunch: '',
          dinner: '',
        });
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 p-2 rounded-full">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-600">Menu Management</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <Upload className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Upload Menu</h2>
              <p className="text-gray-600 mt-1">Set the menu for tomorrow’s meals</p>
            </div>
          </div>

          {/* Date Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-8 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900">Menu Date</p>
                <p className="text-lg font-bold text-blue-900">{formatDate(formData.date)}</p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-800 font-medium">Menu uploaded successfully!</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Breakfast */}
            <InputWithIcon
              icon={Coffee}
              color="orange"
              label="Breakfast Menu"
              name="breakfast"
              value={formData.breakfast}
              onChange={handleChange}
              placeholder="e.g., Idli, Sambar, Chutney"
              ring="orange-500"
            />

            {/* Lunch */}
            <InputWithIcon
              icon={Sun}
              color="green"
              label="Lunch Menu"
              name="lunch"
              value={formData.lunch}
              onChange={handleChange}
              placeholder="e.g., Roti, Rice, Dal, Veg"
              ring="green-500"
            />

            {/* Dinner */}
            <InputWithIcon
              icon={Moon}
              color="purple"
              label="Dinner Menu"
              name="dinner"
              value={formData.dinner}
              onChange={handleChange}
              placeholder="e.g., Paneer Biryani, Curd, Salad"
              ring="purple-500"
            />

            {/* Submit */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center space-x-3 px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Uploading Menu...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Upload Menu</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">Tips for uploading menu:</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
              <li>Be specific with dish names (e.g., “Veg Pulao with Raita”)</li>
              <li>Add commas between multiple items</li>
              <li>Verify for typos before uploading</li>
              <li>Keep dietary preferences in mind</li>
            </ul>
          </div>
        </div>

        {/* Menu Preview */}
        {(formData.breakfast || formData.lunch || formData.dinner) && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 mt-8 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Menu Preview</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {formData.breakfast && (
                <MenuCard
                  title="Breakfast"
                  icon={Coffee}
                  bg="orange"
                  content={formData.breakfast}
                />
              )}
              {formData.lunch && (
                <MenuCard
                  title="Lunch"
                  icon={Sun}
                  bg="green"
                  content={formData.lunch}
                />
              )}
              {formData.dinner && (
                <MenuCard
                  title="Dinner"
                  icon={Moon}
                  bg="purple"
                  content={formData.dinner}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 🔹 Reusable Input Field
function InputWithIcon({ icon: Icon, color, label, name, value, onChange, placeholder, ring }) {
  return (
    <div className="space-y-2">
      <label className="flex items-center space-x-3 text-sm font-medium text-gray-700">
        <div className={`bg-${color}-100 p-1.5 rounded-full`}>
          <Icon className={`w-4 h-4 text-${color}-600`} />
        </div>
        <span>{label}</span>
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${ring} focus:border-transparent transition-colors placeholder-gray-400`}
      />
    </div>
  );
}

// 🔹 Reusable Preview Card
function MenuCard({ title, icon: Icon, bg, content }) {
  return (
    <div className={`bg-gradient-to-br from-${bg}-50 to-${bg}-100 rounded-lg p-4 border border-${bg}-200`}>
      <div className="flex items-center space-x-3 mb-3">
        <div className={`bg-${bg}-100 p-2 rounded-full`}>
          <Icon className={`w-5 h-5 text-${bg}-600`} />
        </div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
      </div>
      <p className="text-gray-700 font-medium">{content}</p>
    </div>
  );
}

export default UploadMenu;
