import React, { useState } from 'react';

const FeedbackForm = ({ eventId }) => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    eventId: eventId,
    rating: '',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send feedback data to the backend
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback),
    });

    if (response.ok) {
      alert('Feedback submitted successfully!');
      setFeedback({ name: '', email: '', eventId: eventId, rating: '', comments: '' });
    } else {
      alert('Failed to submit feedback.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={feedback.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
      />
      <input
        type="email"
        name="email"
        value={feedback.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
      />
      <input
        type="number"
        name="rating"
        value={feedback.rating}
        onChange={handleChange}
        placeholder="Rating (1-5)"
        required
      />
      <textarea
        name="comments"
        value={feedback.comments}
        onChange={handleChange}
        placeholder="Your Comments"
        required
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
