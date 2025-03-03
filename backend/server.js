const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const paymentRoutes = require("./routes/paymentRoutes"); // Ensure this is correct

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/payment", paymentRoutes);  // Use your payment routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});