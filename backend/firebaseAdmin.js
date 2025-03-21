const admin = require('firebase-admin');
require('dotenv').config();  // Load environment variables from .env

// Get the Firebase service account credentials from the environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_JSON);

// Initialize Firebase Admin SDK with the credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
