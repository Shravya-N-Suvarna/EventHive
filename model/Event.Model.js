
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: Date,
  time: String,
  category: {
    type: String,
    enum: ['all', 'workshop', 'movie_nights', 'comedy_shows', 'talent_shows', 'game_nights', 'charity_event', 'festival_celebrations'],
    default: 'all',
  },
  image: String,
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
