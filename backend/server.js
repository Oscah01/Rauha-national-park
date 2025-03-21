require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // You might need bcrypt for password hashing
const paymentRoutes = require("./routes/paymentRoutes");
const emailRoutes = require("./routes/emailRoutes");
const userRoutes = require("./routes/userRoutes"); // Import userRoutes
const { verifyToken } = require("./middleware/auth"); // Import the verifyToken middleware
const User = require("./models/User"); // Import the User model

const app = express();
// ✅ CORS Configuration (Allow Frontend URL)
const corsOptions = {
  origin: "http://localhost:5173", // Change this to your frontend URL in production
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.static('build'));

// ✅ Fix Cross-Origin-Opener-Policy (COOP) Blocking `window.close()`
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// ✅ Middleware
app.use(bodyParser.json());

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI; // Get MongoDB connection string from .env

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Routes
app.use("/api/payment", paymentRoutes);
app.use("/api/email", emailRoutes);
app.use("/api", userRoutes); // Use userRoutes

// ✅ Protected Route Example
app.get("/api/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: 'You have access to this protected route!' });
});

app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// ✅ Route to Generate JWT for User after Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Here you would find the user from the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Validate password with bcrypt (assuming passwords are hashed in DB)
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT Token
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
  // Send token in response
  res.status(200).json({ message: "Login successful", token });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});