require("dotenv").config();
const express = require("express");
const axios = require("axios");
const rateLimit = require("express-rate-limit");

const router = express.Router();
const companyToken = process.env.COMPANY_TOKEN;

// Ensure the CompanyToken is set
if (!companyToken) {
  console.error("Missing Company Token! Set COMPANY_TOKEN in the .env file.");
  process.exit(1); // Stop server if CompanyToken is missing
}

// Apply rate limiting to prevent abuse (100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: "Too many requests, please try again later." },
});

router.use(limiter);

router.post("/create-transaction", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Validate required fields
    if (!amount || !currency) {
      return res.status(400).json({ error: "Amount and currency are required." });
    }

    // Validate amount
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount." });
    }

    // Generate current date/time in the required format
    const currentDateTime = new Date().toISOString().replace("T", " ").split(".")[0];
    const companyRef = `REF-${Date.now()}`;

    // Construct the XML request
    const xmlRequest = `<?xml version="1.0" encoding="utf-8"?>
      <API3G>
        <CompanyToken>${companyToken}</CompanyToken>
        <Request>createToken</Request>
        <Transaction>
          <PaymentAmount>${parsedAmount}</PaymentAmount>
          <PaymentCurrency>${currency}</PaymentCurrency>
          <CompanyRef>${companyRef}</CompanyRef>
          <RedirectURL>http://example.com/success</RedirectURL>
          <BackURL>http://example.com/cancel</BackURL>
          <CompanyRefUnique>1</CompanyRefUnique>
          <PTL>60</PTL>
        </Transaction>
        <Services>
          <Service>
            <ServiceType>99217</ServiceType>
            <ServiceDescription>Accommodation</ServiceDescription>
            <ServiceDate>${currentDateTime}</ServiceDate>
          </Service>
        </Services>
      </API3G>`;

    console.log("Sending XML request to DPO:", xmlRequest);

    // Send the request to DPO API
    const response = await axios.post("https://secure.3gdirectpay.com/API/v6/", xmlRequest, {
      headers: { "Content-Type": "application/xml" },
    });

    // Extract TransToken safely
    const transTokenMatch = response.data.match(/<TransToken>(.*?)<\/TransToken>/);
    if (!transTokenMatch) {
      console.error("DPO response error:", response.data);
      return res.status(500).json({ error: "Failed to retrieve TransToken." });
    }

    res.json({ TransToken: transTokenMatch[1] });

  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ error: "Transaction failed, please try again later." });
  }
});

module.exports = router;
