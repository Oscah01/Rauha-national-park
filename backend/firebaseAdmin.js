// backend/firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./tungacamp-216ff-firebase-adminsdk-fbsvc-3c3325eebf.json');  // Make sure to replace this with your actual service account file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
