import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportingPage = () => {
  const [attendanceReports, setAttendanceReports] = useState([]);
  const [feedbackSummaries, setFeedbackSummaries] = useState([]);
  const [eventPerformanceMetrics, setEventPerformanceMetrics] = useState([]);

  useEffect(() => {
    fetchAttendanceReports();
    fetchFeedbackSummaries();
    fetchEventPerformanceMetrics();
  }, []);

  const fetchAttendanceReports = async () => {
    try {
      const response = await axios.get('/api/reports/attendance');
      setAttendanceReports(response.data);
    } catch (error) {
      console.error('Error fetching attendance reports:', error);
    }
  };

  const fetchFeedbackSummaries = async () => {
    try {
      const response = await axios.get('/api/reports/feedback');
      setFeedbackSummaries(response.data);
    } catch (error) {
      console.error('Error fetching feedback summaries:', error);
    }
  };

  const fetchEventPerformanceMetrics = async () => {
    try {
      const response = await axios.get('/api/reports/performance');
      setEventPerformanceMetrics(response.data);
    } catch (error) {
      console.error('Error fetching event performance metrics:', error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Reporting</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Attendance Reports</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {attendanceReports.map((report) => (
            <div key={report.eventId} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">{report.eventTitle}</h3>
              <p className="text-gray-700 mb-2">Registrations: {report.registrations}</p>
              <p className="text-gray-700 mb-4">Attendance: {report.attendance}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Feedback Summaries</h2>
        <div className="space-y-4">
          {feedbackSummaries.map((summary) => (
            <div key={summary.eventId} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">{summary.eventTitle}</h3>
              <p className="text-gray-700 mb-2">Average Rating: {summary.avgRating.toFixed(1)}</p>
              <p className="text-gray-700 mb-4">Feedback Count: {summary.feedbackCount}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Event Performance Metrics</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {eventPerformanceMetrics.map((metrics) => (
            <div key={metrics.eventId} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">{metrics.eventTitle}</h3>
              <p className="text-gray-700 mb-2">Registrations: {metrics.registrations}</p>
              <p className="text-gray-700 mb-2">Attendees: {metrics.attendees}</p>
              <p className="text-gray-700 mb-2">Average Rating: {metrics.avgRating.toFixed(1)}</p>
              <p className="text-gray-700 mb-4">Feedback Count: {metrics.feedbackCount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportingPage;
