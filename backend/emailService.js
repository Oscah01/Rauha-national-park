const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendBookingConfirmationEmail = (email, checkInDate, checkOutDate, selectedOptions, totalAmount) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Booking Confirmation - Tungamalenga Lodge and Camp Site",
        text: `Thank you for your booking at Tungamalenga Lodge and Camp Site!\n\nCheck-in Date: ${checkInDate}\nCheck-out Date: ${checkOutDate}\n\nSelected Options:\n${selectedOptions
          .map((option) => `${option.title} - ${option.price} USD`)
          .join("\n")}\n\nTotal Amount: ${totalAmount} USD\n\nPlease complete your payment to confirm your booking.\n\nWe look forward to hosting you!`,
      };
      

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error); // Log the error
        reject(error);
      } else {
        console.log("Email sent:", info.response); // Log the success
        resolve(info);
      }
    });
  });
};

module.exports = { sendBookingConfirmationEmail };