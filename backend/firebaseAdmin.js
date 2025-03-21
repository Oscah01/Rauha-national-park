require('dotenv').config();  // Make sure to load the .env variables

const admin = require('firebase-admin');

// Check if FIREBASE_ADMIN_SDK_JSON is defined in the environment variables
const serviceAccountJson = process.env.FIREBASE_ADMIN_SDK_JSON;

if (!serviceAccountJson) {
  console.error("FIREBASE_ADMIN_SDK_JSON is not defined.");
  process.exit(1);  // Exit if the variable is missing
}

// Parse the JSON string for the Firebase service account
let serviceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountJson);
} catch (error) {
  console.error("Error parsing Firebase service account JSON:", error);
  process.exit(1);  // Exit if JSON parsing fails
}

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log("Firebase Admin SDK initialized successfully.");
