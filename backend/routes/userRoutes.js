const express = require('express');
const admin = require('firebase-admin'); // Import Firebase Admin SDK
const { verifyToken } = require('../middleware/auth'); // Middleware to verify JWT
const { saveUser, signUpWithEmail, signInWithEmail } = require('../controller/userController');


const router = express.Router();

// Middleware to check if the user is an admin using Firebase custom claims
const isAdmin = async (req, res, next) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1]; // Get the ID token from the request header
    if (!idToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      if (decodedToken.admin === true) {
        req.user = decodedToken; // Attach the user to the request object
        return next(); // Allow access
      } else {
        return res.status(403).json({ message: 'Not authorized' });
      }
    } catch (error) {
      console.error('Authorization error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

// Route to promote a user to admin
// In userRoutes.js
router.post('/make-admin', isAdmin, async (req, res) => {
    const { uid } = req.body; // Get the user's UID from the request body
  
    if (!uid) {
      return res.status(400).json({ success: false, message: 'User UID is required.' });
    }
  
    try {
      // Set custom claims
      await admin.auth().setCustomUserClaims(uid, { admin: true });
  
      // Update the user's role in Firestore
      const userRef = admin.firestore().collection('users').doc(uid);
      await userRef.update({ role: 'admin' });
  
      res.status(200).json({ success: true, message: `User ${uid} is now an admin.` });
    } catch (error) {
      console.error('Error promoting user to admin:', error);
      res.status(500).json({ success: false, message: 'Failed to promote user to admin.' });
    }
  });

  // Check Admin Status
// In userRoutes.js
router.get('/check-admin', verifyToken, async (req, res) => {
    try {
      const idToken = req.headers.authorization?.split('Bearer ')[1]; // Get the ID token from the request header
      if (!idToken) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // Verify the ID token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log('Decoded token:', decodedToken); // Log the decoded token
  
      // Check if the user has the admin claim
      res.status(200).json(decodedToken.admin === true); // Return a boolean directly
    } catch (error) {
      console.error('Error checking admin status:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });
// Google Sign-In
router.post('/signin/google', saveUser);

// Email Sign-Up
router.post('/signup/email', signUpWithEmail);

// Email Sign-In
router.post('/signin/email', signInWithEmail);



module.exports = router;