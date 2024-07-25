import mongoose from 'mongoose';

const { Schema } = mongoose;

const FeedbackSchema = new Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      feedback: {
        type: String,
        required: true
      }
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

export default Feedback;
