import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import './index.css';
import About from './pages/About';
import Contact from './pages/Contact';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';

import Register from './pages/Register';
// import User from './pages/User';
import AdminDashboard from './pages/AdminDashboard';
import ManageEvents from './pages/ManageEvents';
import ManageUsers from './pages/ManageUsers';
import RegistrationMonitoring from './pages/RegistrationMonitoring';
import Reports from './pages/Reports';
import Feedback from './pages/Feedback';
import Events from './pages/Events';
import AdminLogin from './pages/AdminLogin'
import { useAuth } from './context/AuthProvider';
import MyEvents from './pages/MyEvents';
import RegistrationModal from './pages/RegistrationModal';

 
const App = () => {
  const [authUser]= useAuth();
  return (
    <Router>
       <Toaster/>
      <Routes>
      <Route path="/" element={<LandingPage/>}/>
     
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/about" element={<About Us/>}/>
      <Route path="/contact" element={<Contact/>}/>
      {/* <Route path="/events" element={<Events/>}/> */}
      <Route path="/admin" element={<AdminLogin/>}/>
      {/* <Route path="/user" element={<User/>}/> */}
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/Events" element={<ManageEvents/>} />
      <Route path="/users" element={<ManageUsers />} />
      <Route path="/registrations" element={<RegistrationMonitoring />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/event" element={authUser?<Events />:<Navigate to="/login" />} />
      <Route path="/myEvents" element={<MyEvents />} />
      <Route path="/RM" element={<RegistrationModal />} />
     
      </Routes>
    </Router>
   
  );
};

export default App;
