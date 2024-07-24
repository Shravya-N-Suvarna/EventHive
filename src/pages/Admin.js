import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import ManageEvents from '../pages/ManageEvents';
import ManageUsers from './ManageUsers';
import Reports from './Reports';
import Feedback from './Feedback';
import RegistrationMonitoring from '../pages/RegistrationMonitoring';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admindashboard" element={<AdminDashboard />}>
          <Route path="/Events" element={<ManageEvents />} />
          <Route path="/users" element={<ManageUsers />} />
          <Route path="/registrations" element={<RegistrationMonitoring />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;
