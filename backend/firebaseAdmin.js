const admin = require('firebase-admin');
require('dotenv').config(); // Ensure dotenv is loaded

// Make sure the environment variable is defined
const firebaseKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!firebaseKey) {
  console.error('FIREBASE_SERVICE_ACCOUNT_KEY is not defined in environment variables');
  process.exit(1); // Exit if the key is missing
}

// Try parsing the key and log any issues
let serviceAccount;
try {
  serviceAccount = JSON.parse(firebaseKey);
} catch (err) {
  console.error('Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:', err);
  process.exit(1); // Exit if parsing fails
}

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
