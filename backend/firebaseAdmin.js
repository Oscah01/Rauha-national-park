const admin = require('firebase-admin');
require('dotenv').config(); // Ensure dotenv is loaded

// Parse the environment variable to get the service account credentials
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
