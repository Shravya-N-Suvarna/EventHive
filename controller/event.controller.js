
import Event from '../model/Event.model.js';
import Registration from '../model/registration.model.js';

export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEvents = async (req, res) => {
  const { category } = req.query;
  try {
    const events = await Event.find(category ? { category } : {});
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// export const getuserEvents = async (req, res) => {
  
//   try {
//     const events = await Event.find({});
//     res.status(200).json(events);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const registerForEvent = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body; // Assuming these are the fields
  console.log('Registering for event with data:', { name, email, phone, address, eventId: id });

  try {
    const event = await Event.findById(id);
    if (!event) {
      console.error('Event not found:', id);
      return res.status(404).json({ error: 'Event not found' });
    }

    const registration = new Registration({ name, email, phone, address, eventId: id });
    await registration.save();

    res.status(201).json({ message: 'Successfully registered for the event!' });
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const registrations = await Registration.find().populate("eventId").exec();
    if (!registrations) {
      return res.status(404).json({ error: 'No events found' });
    }
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().populate('eventId').exec();
    if (!registrations || registrations.length === 0) {
      return res.status(404).json({ error: 'No registrations found' });
    }
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRegistrationStatus = async (req, res) => {
  const { registrationId } = req.params;
  const { action } = req.body;

  console.log(`Received action: ${action} for registrationId: ${registrationId}`);

  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      registrationId,
      { status: action },
      { new: true }
    );
    if (!updatedRegistration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    console.log('Updated registration:', updatedRegistration);
    res.json(updatedRegistration);
  } catch (error) {
    console.error('Error updating registration status:', error);
    res.status(500).json({ error: 'Failed to update registration status' });
  }
};


export const cancelEvent = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration) return res.status(404).json({ error: 'Registration not found' });
    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markAttendance = async (req, res) => {
  const { registrationId } = req.params;
  const { attended } = req.body; // Expecting boolean value for attendance

  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      registrationId,
      { attended },
      { new: true }
    );
    if (!updatedRegistration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.status(200).json(updatedRegistration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAttendanceForEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const registrations = await Registration.find({ eventId }).exec();
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






// export const getuserEvents = async (req, res) => {
//   try {
//     const event = await Registration.find({name:req.body.name});
//     if (!event) {
//       console.error('Event not found');
//       return res.status(404).json({ error: 'Event not found' });
//     }
//     res.status(201).json(event);
//   } catch (error) {
//     console.error('Error getting for event:', error);
//     res.status(500).json({ error: error.message });
//   }
// };