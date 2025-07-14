import React, { useState } from 'react';
import {
  ArrowRightCircle,
  Users,
  TrendingDown,
  Calendar,
  Shield,
  Moon,
  Sun,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN');
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      {/* Top Controls */}
      <div>
        <button onClick={toggleDarkMode}>
          {darkMode ? <Sun /> : <Moon />}
        </button>

        <select 
          value={language} 
          onChange={(e) => {
            setLanguage(e.target.value);
            alert('Language switching coming soon!');
          }}
        >
          <option value="EN">English</option>
          <option value="HI">हिन्दी</option>
        </select>
      </div>

      {/* Main Content */}
      <div>
        {/* Hero Section */}
        <section>
          <div>
            {/* Illustration */}
            <div>
              <div>
                <div>🍽️</div>
              </div>
            </div>

            {/* Text Content */}
            <div>
              <div>
                <span>🍽️</span>
                <span>Smart Meal Planning</span>
              </div>

              <h1>
                <span>Meal Saver</span>
                <br />
                <span>System</span>
              </h1>

              <p>
                A smarter way to reduce food waste using attendance-based meal planning.
              </p>

              <p>
                "Plan right, serve right — every plate counts!"
              </p>

              {/* Action Buttons */}
              <div>
                <ActionButton label="Login" onClick={() => handleNavigation('/login')} />
                <ActionButton label="Register" onClick={() => handleNavigation('/register')} />
                <ActionButton label="Admin Panel" icon={Shield} onClick={() => handleNavigation('/admin')} />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section>
          <div>
            <SectionHeader title="Smart Features" subtitle="Revolutionizing meal planning with intelligent automation" />
            <div>
              <Feature icon={Users} title="Smart Attendance" desc="Real-time student attendance sync to avoid over-prepping." />
              <Feature icon={TrendingDown} title="Waste Reduction" desc="Minimize cooking surplus and reduce kitchen leftovers." />
              <Feature icon={Calendar} title="Easy Planning" desc="Upload menus and automate schedules with ease." />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section>
          <div>
            <SectionHeader title="Making a Difference" subtitle="Empowering institutions to cook smarter and greener." />
            <div>
              <Stat number="2,500+" label="Meals Saved" />
              <Stat number="40%" label="Waste Reduced" />
              <Stat number="150+" label="Active Users" />
              <Stat number="98%" label="Accuracy Rate" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div>
            <p>© 2025 Meal Saver System. All rights reserved.</p>
            <p>Crafted with ❤️ to help you save resources, reduce waste, and build a smarter kitchen.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

// ----------------------
// Reusable Components
// ----------------------

function SectionHeader({ title, subtitle }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

function ActionButton({ label, onClick, icon: Icon }) {
  return (
    <button onClick={onClick}>
      {Icon && <Icon />}
      <span>{label}</span>
      {!Icon && <ArrowRightCircle />}
    </button>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div>
      <div>
        <div>
          <Icon />
        </div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <div>
        <div>{number}</div>
        <div>{label}</div>
      </div>
    </div>
  );
}

export default Landing;