// server/controllers/authController.js
import bcrypt from 'bcryptjs';
import { getAdminByEmail } from '../model/admin.model.js';

export const login = (req, res) => {
  const { email, password } = req.body;

  const admin = getAdminByEmail(email);

  if (admin) {
    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords' });
      }

      if (isMatch) {
        return res.status(200).json({ email: admin.email });
      } else {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    });
  } else {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
};
