import React, { useState } from 'react';
import { Upload, Calendar, Coffee, Sun, Moon, CheckCircle, ArrowLeft, Shield } from 'lucide-react';

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

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
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
      alert(data.message);
      setSuccess(true);
      // Reset form after successful upload
      setFormData({
        date: dateStr,
        breakfast: '',
        lunch: '',
        dinner: '',
      });
    } catch (err) {
      alert('Upload failed');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Upload Menu Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <Upload className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Upload Menu</h2>
                <p className="text-gray-600 mt-1">Set the menu for tomorrow's meals</p>
              </div>
            </div>

            {/* Date Display */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-8 border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">Uploading menu for:</p>
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
            <div className="space-y-6">
              <div className="grid gap-6">
                {/* Breakfast Input */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 text-sm font-medium text-gray-700">
                    <div className="bg-orange-100 p-1.5 rounded-full">
                      <Coffee className="w-4 h-4 text-orange-600" />
                    </div>
                    <span>Breakfast Menu</span>
                  </label>
                  <input
                    type="text"
                    name="breakfast"
                    value={formData.breakfast}
                    onChange={handleChange}
                    placeholder="Enter breakfast menu items..."
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors placeholder-gray-400"
                  />
                </div>

                {/* Lunch Input */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 text-sm font-medium text-gray-700">
                    <div className="bg-green-100 p-1.5 rounded-full">
                      <Sun className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Lunch Menu</span>
                  </label>
                  <input
                    type="text"
                    name="lunch"
                    value={formData.lunch}
                    onChange={handleChange}
                    placeholder="Enter lunch menu items..."
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors placeholder-gray-400"
                  />
                </div>

                {/* Dinner Input */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 text-sm font-medium text-gray-700">
                    <div className="bg-purple-100 p-1.5 rounded-full">
                      <Moon className="w-4 h-4 text-purple-600" />
                    </div>
                    <span>Dinner Menu</span>
                  </label>
                  <input
                    type="text"
                    name="dinner"
                    value={formData.dinner}
                    onChange={handleChange}
                    placeholder="Enter dinner menu items..."
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  onClick={handleSubmit}
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
            </div>

            {/* Help Text */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Tips for uploading menu:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Be specific with menu items (e.g., "Masala Dosa with Chutney" instead of just "Dosa")</li>
                <li>• Include any special dietary information if applicable</li>
                <li>• Separate multiple items with commas</li>
                <li>• Double-check all entries before uploading</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        {(formData.breakfast || formData.lunch || formData.dinner) && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 mt-8">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Menu Preview</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {formData.breakfast && (
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <Coffee className="w-5 h-5 text-orange-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">Breakfast</h4>
                    </div>
                    <p className="text-gray-700 font-medium">{formData.breakfast}</p>
                  </div>
                )}

                {formData.lunch && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Sun className="w-5 h-5 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">Lunch</h4>
                    </div>
                    <p className="text-gray-700 font-medium">{formData.lunch}</p>
                  </div>
                )}

                {formData.dinner && (
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Moon className="w-5 h-5 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">Dinner</h4>
                    </div>
                    <p className="text-gray-700 font-medium">{formData.dinner}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadMenu;