// backend/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  uid: { type: String, unique: true }, // Firebase UID
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Firebase users
  displayName: { type: String },
  photoURL: { type: String },
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false }, // Admin flag
  provider: { type: String }, // Authentication provider (e.g., Google, email)
  lastSignIn: { type: Date }, // Track last sign-in time
});

// Hash password before saving (only for email/password users)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
