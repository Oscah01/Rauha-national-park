require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // For password hashing
const paymentRoutes = require("./routes/paymentRoutes");
const emailRoutes = require("./routes/emailRoutes");
const userRoutes = require("./routes/userRoutes");
const { verifyToken } = require("./middleware/auth");
const User = require("./models/User");

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: "https://www.ruahatungacamp.com", // Allow only your frontend domain
  credentials: true, // Allow cookies and credentials
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests for all routes

// ✅ Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static("build")); // Serve static files (if applicable)

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI; // Get MongoDB connection string from .env

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Routes
app.use("/api/payment", paymentRoutes); // Payment-related routes
app.use("/api/email", emailRoutes); // Email-related routes
app.use("/api", userRoutes); // User-related routes

// ✅ Protected Route Example
app.get("/api/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "You have access to this protected route!" });
});

// ✅ Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send the token in the response
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong during login" });
  }
});

// ✅ Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});