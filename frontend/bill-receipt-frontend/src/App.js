import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from "./components/Register";
import Dashboard from './components/Dashboard';
import MonthlyRevenue from "./components/MonthlyRevenue";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/monthly-revenue" element={<MonthlyRevenue />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
