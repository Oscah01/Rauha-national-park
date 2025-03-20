const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/create-transaction", async (req, res) => {
  console.log("Received payment request:", req.body);

  try {
    // Validate required fields
    if (!req.body.amount || !req.body.currency) {
      return res.status(400).json({ error: "Amount and currency are required" });
    }

    // Generate current date and time in the required format
    const currentDateTime = new Date().toISOString().replace("T", " ").split(".")[0];
    const companyRef = `REF-${Date.now()}`;

    // Construct the XML request using template literals
    const xmlRequest = `<?xml version="1.0" encoding="utf-8"?>
      <API3G>
        <CompanyToken>4B02B9C9-3CBD-4646-B46B-6FFD4B7A64F1</CompanyToken> <!-- Live CompanyToken -->
        <Request>createToken</Request>
        <Transaction>
          <PaymentAmount>${req.body.amount}</PaymentAmount>
          <PaymentCurrency>${req.body.currency}</PaymentCurrency> <!-- USD or TZS -->
          <CompanyRef>${companyRef}</CompanyRef>
          <RedirectURL>http://example.com/success</RedirectURL>
          <BackURL>http://example.com/cancel</BackURL>
          <CompanyRefUnique>1</CompanyRefUnique>
          <PTL>60</PTL>
        </Transaction>
        <Services>
          <Service>
            <ServiceType>99217</ServiceType> <!-- Updated to live ServiceType -->
            <ServiceDescription>Accommodation</ServiceDescription> <!-- Updated to live ServiceDescription -->
            <ServiceDate>${currentDateTime}</ServiceDate>
          </Service>
        </Services>
      </API3G>`;

    console.log("Sending XML request to DPO:", xmlRequest);

    // Send the request to DPO API
    const response = await axios.post(
      "https://secure.3gdirectpay.com/API/v6/", // Live DPO API endpoint
      xmlRequest,
      { headers: { "Content-Type": "application/xml" } }
    );

    console.log("DPO Pay Raw Response:", response.data); // Log the full response

    // Check if response contains an error
    if (!response.data) {
      return res.status(500).json({ error: "Invalid response from DPO" });
    }

    // Extract TransToken
    const transTokenMatch = response.data.match(/<TransToken>(.*?)<\/TransToken>/);
    const transToken = transTokenMatch ? transTokenMatch[1] : null;

    if (!transToken) {
      return res.status(500).json({ error: "Failed to retrieve TransToken", dpoResponse: response.data });
    }

    // Return the TransToken to the frontend
    res.json({ TransToken: transToken });

  } catch (error) {
    console.error("Error during payment processing:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to create transaction",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;