import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/Dashboard.css";
import Profile from './Profile';
import Billing from './Billing';
import LastBills from './LastBills';
import TotalMonthlyRevenue from './TotalMonthlyRevenue';
import MonthlyRevenueSummary from './MonthlyRevenue';
import logo from '../Logo.PNG';

const Dashboard = () => {
  const currentDate = new Date();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');  // Get the current month (1-12)
  const currentYear = currentDate.getFullYear();

  const [user, setUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState('profile');
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear.toString());
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setUser(userInfo);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
  const handleSectionChange = (section) => {
    setSelectedSection(section);
    if (section === 'monthly-revenue') {
      setMonth(currentMonth);
      setYear(currentYear.toString());
    }
  };

  const renderSection = () => {
    switch (selectedSection) {
      case 'profile':
        return <Profile />;
      case 'billing':
        return <Billing />;
      case 'monthly-revenue':
        return (
          <div>
            <div className="filters">
              <label>Month: </label>
              <select value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>

              <label>Year: </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                min="2000"
                max="2100"
              />
            </div>

            <TotalMonthlyRevenue month={month} year={year} />
            <MonthlyRevenueSummary month={month} year={year} />
          </div>
        );
      case 'last-bills':
        return <LastBills />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="dashboard">
      <div className='ontop'>
        <header className="navbar navbar-light bg-light shadow-sm">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            {/* Logo on the left */}
            <img src={logo} alt="Logo" className="navbar-brand" style={{ height: '40px' }} />

            {/* Welcome text in the center */}
            <h2 className="mx-auto">Welcome, {user?.name}</h2>

            {/* Logout button on the right */}
            <button
              className="btn btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>
      </div>


      <div className="container-fluid sidenav">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 p-3">
            <h4 className="mb-4">Dashboard</h4>
            
            <ul className="dashboard-list">
              {['profile', 'billing', 'monthly-revenue', 'last-bills'].map((section) => (
                <li key={section}>
                  <button
                    className={`btnn fs-6 ${selectedSection === section ? 'active' : ''}`}
                    onClick={() => handleSectionChange(section)}
                  >
                    {section.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </button>
                </li>
              ))}
            </ul>

          </div>

        </div>
      </div>
      <div className="col-md-9 col-lg-10 dynamiccontent">
        <div className="content">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
