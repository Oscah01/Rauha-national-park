const admin = require('firebase-admin');
const path = require('path');

// Load the service account key from the JSON file in the backend directory
const serviceAccount = require(path.join(__dirname, 'tungacamp-216ff-firebase-adminsdk-fbsvc-06b544aeb2.json'));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
