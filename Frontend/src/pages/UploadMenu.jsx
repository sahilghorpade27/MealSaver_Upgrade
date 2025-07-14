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
    <div>
      {/* Header */}
      <div>
        <div>
          <div>
            <div>
              <Shield />
            </div>
            <div>
              <h1>Admin Panel</h1>
              <p>Menu Management</p>
            </div>
          </div>
          <button onClick={() => navigate('/admin')}>
            <ArrowLeft />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div>
        <div>
          {/* Header */}
          <div>
            <div>
              <Upload />
            </div>
            <div>
              <h2>Upload Menu</h2>
              <p>Set the menu for tomorrow's meals</p>
            </div>
          </div>

          {/* Date Card */}
          <div>
            <div>
              <div>
                <Calendar />
              </div>
              <div>
                <p>Menu Date</p>
                <p>{formatDate(formData.date)}</p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div>
              <div>
                <CheckCircle />
                <p>Menu uploaded successfully!</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <InputWithIcon
              icon={Coffee}
              label="Breakfast Menu"
              name="breakfast"
              value={formData.breakfast}
              onChange={handleChange}
              placeholder="e.g., Idli, Sambar, Chutney"
            />

            <InputWithIcon
              icon={Sun}
              label="Lunch Menu"
              name="lunch"
              value={formData.lunch}
              onChange={handleChange}
              placeholder="e.g., Roti, Rice, Dal, Veg"
            />

            <InputWithIcon
              icon={Moon}
              label="Dinner Menu"
              name="dinner"
              value={formData.dinner}
              onChange={handleChange}
              placeholder="e.g., Paneer Biryani, Curd, Salad"
            />

            {/* Submit */}
            <div>
              <button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <div />
                    <span>Uploading Menu...</span>
                  </>
                ) : (
                  <>
                    <Upload />
                    <span>Upload Menu</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Help Text */}
          <div>
            <h3>Tips for uploading menu:</h3>
            <ul>
              <li>Be specific with dish names (e.g., "Veg Pulao with Raita")</li>
              <li>Add commas between multiple items</li>
              <li>Verify for typos before uploading</li>
              <li>Keep dietary preferences in mind</li>
            </ul>
          </div>
        </div>

        {/* Menu Preview */}
        {(formData.breakfast || formData.lunch || formData.dinner) && (
          <div>
            <h3>Menu Preview</h3>
            <div>
              {formData.breakfast && (
                <MenuCard
                  title="Breakfast"
                  icon={Coffee}
                  content={formData.breakfast}
                />
              )}
              {formData.lunch && (
                <MenuCard
                  title="Lunch"
                  icon={Sun}
                  content={formData.lunch}
                />
              )}
              {formData.dinner && (
                <MenuCard
                  title="Dinner"
                  icon={Moon}
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

function InputWithIcon({ icon: Icon, label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label>
        <div>
          <Icon />
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
      />
    </div>
  );
}

function MenuCard({ title, icon: Icon, content }) {
  return (
    <div>
      <div>
        <div>
          <Icon />
        </div>
        <h4>{title}</h4>
      </div>
      <p>{content}</p>
    </div>
  );
}

export default UploadMenu;