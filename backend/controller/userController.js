const express = require('express');
const router = express.Router();
const admin = require('../firebaseAdmin'); // Import Firebase admin SDK
const User = require('../models/User'); // Import the User model

// Middleware to check authentication (optional, adjust as needed)
const authMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

// Save user function - modify to use Firebase
const saveUser = async (req, res) => {
  try {
    const { uid, email, displayName, photoURL, provider } = req.body;

    // Check if user already exists in the MongoDB database
    let existingUser = await User.findOne({ uid });
    if (existingUser) {
      existingUser.lastSignIn = Date.now();
      await existingUser.save();
      return res.status(200).json({ message: 'User signed in successfully', user: existingUser });
    }

    // Check if the user should be an admin
    const isAdmin = email === "pipkillerinfo@gmail.com";

    const newUser = new User({
      uid,
      email,
      displayName,
      photoURL,
      provider,
      signInMethod: provider, 
      lastSignIn: Date.now(),
      createdAt: Date.now(),
      isAdmin, // Set as admin if email matches
    });

    await newUser.save();
    res.status(201).json({ message: 'User saved successfully', user: newUser });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Email Sign-Up function
const signUpWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if the user should be an admin
    const isAdmin = email === "pipkillerinfo@gmail.com";

    // Create a new user
    const newUser = new User({
      email,
      password, // Hashing is handled in the User model
      createdAt: Date.now(),
      isAdmin, // Set as admin if email matches
    });

    await newUser.save();
    res.status(201).json({ message: 'User signed up successfully', user: newUser });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Email Sign-In function
const signInWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // You should verify the password in a real-world application (e.g., using bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'User signed in successfully', user });
  } catch (error) {
    console.error('Error signing in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Make User Admin function (requires Firebase token validation)
const makeUserAdmin = async (req, res) => {
  try {
    const { userId } = req.body; // Use userId (MongoDB _id) instead of uid

    // Check if the current user is an admin (from Firebase token)
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized: Only admins can perform this action' });
    }

    // Find the user by userId in MongoDB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is already an admin
    if (user.isAdmin) {
      return res.status(400).json({ message: 'User is already an admin' });
    }

    // Update the user's admin status in MongoDB
    user.isAdmin = true;
    await user.save();

    res.status(200).json({ message: 'User has been made an admin', user });
  } catch (error) {
    console.error('Error making user admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { saveUser, signUpWithEmail, signInWithEmail, makeUserAdmin, router };
// 