// // backend/middleware/auth.middleware.js
// import jwt from 'jsonwebtoken';

// // Replace this with your actual secret
// const JWT_SECRET = 'your_jwt_secret_key';

// export const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };
