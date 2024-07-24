
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoute from './route/user.route.js'; // Import the userRoute
import eventRoute from './route/event.route.js'; // Import the eventRoute
import adminRoute from './route/admin.route.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
const PORT = process.env.PORT || 4001;

app.use(bodyParser.json());

const mongoURL = 'mongodb://localhost:27017/EventHive';

mongoose.connect(mongoURL)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use('/user', userRoute);
app.use('/', eventRoute); // Use the eventRoute
app.use('/admin',adminRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
