import Feedback from '../model/feedback.model.js';
// import Event from '../models/Event.js';
// import User from '../models/User.js';

export const getFeedback =async(req, res)=>{
    try {
        const feedbacks = await Feedback.find().populate('eventId').populate('userId');
        res.json(feedbacks);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

export const postFeedback = async(req,res)=>{
    try {
        const { eventId, userId, feedback } = req.body;
    
        // Validate input data
        if (!eventId || !userId || !feedback) {
          return res.status(400).json({ message: 'All fields are required' });
        }
    
        // Create and save new feedback
        const newFeedback = new Feedback({
          eventId,
          userId,
          feedback
        });
        await newFeedback.save();
        res.status(201).json(newFeedback);
      } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ message: 'Internal server error' });
      }

    

}