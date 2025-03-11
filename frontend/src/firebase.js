import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Initialize Firestore
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    await saveUserToBackend(user);
  } catch (error) {
    console.error("Error with Google Sign-In", error);
  }
};

// Sign up with email and password
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await saveUserToBackend(user);
  } catch (error) {
    console.error("Error during sign up", error);
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error during sign in", error);
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error during logout", error);
  }
};

// Save user to Firestore
// In firebase.js
const saveUserToBackend = async (user) => {
  const userRef = doc(db, "users", user.uid);

  try {
    const userSnap = await getDoc(userRef);

    // Assign role based on email
    const role = user.email === "pipkillerinfo@gmail.com" ? "admin" : "user";

    if (!userSnap.exists()) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        provider: user.providerData[0]?.providerId || "email",
        role, // Assign role dynamically
      };

      await setDoc(userRef, userData);
      console.log("User saved with role:", role);
    } else {
      console.log("User already exists:", userSnap.data());
    }
  } catch (error) {
    console.error("Error saving user to Firestore:", error);
  }
};