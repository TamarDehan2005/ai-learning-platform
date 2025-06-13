import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import Dashboard from './components/Dashboard';
import History from './components/History';
import NewPrompt from './components/NewPrompt';
import Admin  from './components/Admin';
import CategoriesAdmin  from './components/CategoryManagement';
import UserManagment from './components/UserManagement';
import PromptManager  from './components/promptManagement';
import HomePage from './components/HomePage';
import DemoCarousel from './components/DemoCarousel';
import  Contact from './components/contact';
import AboutUs  from './components/AboutUs';

export default function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<HomePage />} />
     {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/history" element= {<History />}  />
        <Route path="/new-prompt" element={<NewPrompt />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/categories" element={<CategoriesAdmin />} />
        <Route path="/admin/users" element={<UserManagment />} />
        <Route path="/admin/prompts" element={<PromptManager />} />
        <Route path="/demo" element={<DemoCarousel />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}
