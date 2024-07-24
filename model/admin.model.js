
import bcrypt from 'bcryptjs';

const mockDatabase = {
  'admin@gmail.com': {
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('admin123', 10), // Hash the password for security
  }
};

export const getAdminByEmail = (email) => {
  return mockDatabase[email] || null;
};
