const express = require("express");
const router = express.Router();
const { sendBookingConfirmationEmail } = require("../emailService");

// Route to send booking confirmation email
router.post("/send-email", async (req, res) => {
  const { email, checkInDate, checkOutDate, selectedOptions, totalAmount } = req.body;

  try {
    const info = await sendBookingConfirmationEmail(email, checkInDate, checkOutDate, selectedOptions, totalAmount);
    res.status(200).json({ message: "Booking confirmation email sent! Check your inbox.", info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

module.exports = router;