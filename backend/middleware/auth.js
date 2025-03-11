// backend/middleware/auth.js
const admin = require('../firebaseAdmin'); // Import the Firebase admin instance
const User = require('../models/User'); // Import the User model

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    // Verify Firebase ID Token
    const decoded = await admin.auth().verifyIdToken(token);

    // Fetch the user from MongoDB using the Firebase UID
    const user = await User.findOne({ uid: decoded.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach the user object to the request
    req.user = user;
    next(); // Pass control to the next middleware
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken };
