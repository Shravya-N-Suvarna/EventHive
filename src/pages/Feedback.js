import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:4001/feedback/all_feedback');
        console.log('Feedback response data:', response.data); // Debug: Check the response data
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setError(`Error fetching feedbacks: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return <p>Loading feedbacks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-6 py-8 bg-slate-300">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6 md:mb-8 border-b-4 border-blue-500">
          <h1 className="text-2xl font-bold mb-4">Feedback Monitoring</h1>
          {feedbacks.length === 0 ? (
            <p>No feedback available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-slate-200 border-separate border-spacing-2 border border-black">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border border-black">S.No.</th>
                    <th className="py-2 px-4 border border-black">Event Title</th>
                    <th className="py-2 px-4 border border-black">User Name</th>
                    <th className="py-2 px-4 border border-black">User Email</th>
                    <th className="py-2 px-4 border border-black">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((feedback, index) => (
                    <tr key={feedback._id}>
                      <td className="border border-black px-4 py-2 text-center">{index + 1}</td>
                      <td className="border border-black px-4 py-2 text-center">
                        {feedback.eventId && feedback.eventId.title ? feedback.eventId.title : 'No title available'}
                      </td>
                      <td className="border border-black px-4 py-2 text-center">
                        {feedback.userId && feedback.userId.name ? feedback.userId.name : 'No name available'}
                      </td>
                      <td className="border border-black px-4 py-2 text-center">
                        {feedback.userId && feedback.userId.email ? feedback.userId.email : 'No email available'}
                      </td>
                      <td className="border border-black px-4 py-2 text-center">{feedback.feedback || 'No feedback available'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
