const admin = require('firebase-admin');
const serviceAccount = require('./tungacamp-216ff-firebase-adminsdk-fbsvc-3c3325eebf.json'); // Path to your service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Function to promote a user to admin
const promoteToAdmin = async (uid) => {
  try {
    // Set custom claims
    await admin.auth().setCustomUserClaims(uid, { admin: true });

    // Update the user's role in Firestore
    const userRef = admin.firestore().collection('users').doc(uid);
    await userRef.update({ role: 'admin' });

    console.log(`User ${uid} has been promoted to admin.`);

    // Force token refresh for the user
    const user = await admin.auth().getUser(uid);
    if (user) {
      await admin.auth().revokeRefreshTokens(uid); // Revoke existing tokens
      console.log(`Refresh tokens revoked for user ${uid}.`);
    }
  } catch (error) {
    console.error('Error promoting user to admin:', error);
  }
};

// Replace with the UID of the user you want to promote
const userUid = 'lrJjPzsDWBZDKpWgo1I787cneIH3';
promoteToAdmin(userUid);