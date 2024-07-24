import React, { useState, useEffect } from 'react';

const AdminMonitoringDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch registrations from the backend
    const fetchRegistrations = async () => {
      const response = await fetch('/api/registrations');
      const data = await response.json();
      setRegistrations(data);
    };

    // Fetch feedback from the backend
    const fetchFeedbacks = async () => {
      const response = await fetch('/api/feedbacks');
      const data = await response.json();
      setFeedbacks(data);
    };

    fetchRegistrations();
    fetchFeedbacks();
  }, []);

  return (
    <div>
      <h2>Event Registrations</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Event ID</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr key={registration._id}>
              <td>{registration.name}</td>
              <td>{registration.email}</td>
              <td>{registration.eventId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Event Feedback</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Event ID</th>
            <th>Rating</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td>{feedback.name}</td>
              <td>{feedback.email}</td>
              <td>{feedback.eventId}</td>
              <td>{feedback.rating}</td>
              <td>{feedback.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMonitoringDashboard;
