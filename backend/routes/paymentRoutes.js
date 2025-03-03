const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/create-transaction", async (req, res) => {
  console.log("Received payment request:", req.body);

  try {
    if (!req.body.amount || !req.body.currency) {
      return res.status(400).json({ error: "Amount and currency are required" });
    }

    const currentDateTime = new Date().toISOString().replace("T", " ").split(".")[0];
    const companyRef = `REF-${Date.now()}`;

    const xmlRequest = `<?xml version="1.0" encoding="utf-8"?>
      <API3G>
        <CompanyToken>732CDD7C-34B3-4506-ACF6-B03F94FB44C8</CompanyToken>
        <Request>createToken</Request>
        <Transaction>
          <PaymentAmount>${req.body.amount}</PaymentAmount>
          <PaymentCurrency>${req.body.currency}</PaymentCurrency>
          <CompanyRef>${companyRef}</CompanyRef>
          <RedirectURL>http://example.com/success</RedirectURL>
          <BackURL>http://example.com/cancel</BackURL>
          <CompanyRefUnique>1</CompanyRefUnique>
          <PTL>60</PTL>
        </Transaction>
        <Services>
          <Service>
            <ServiceType>54844</ServiceType> <!-- Updated to the correct ServiceType -->
            <ServiceDescription>Test Product</ServiceDescription>
            <ServiceDate>${currentDateTime}</ServiceDate>
          </Service>
        </Services>
      </API3G>`;

    console.log("Sending XML request to DPO:", xmlRequest);

    const response = await axios.post(
      "https://secure.3gdirectpay.com/API/v6/",
      xmlRequest,
      { headers: { "Content-Type": "application/xml" } }
    );

    console.log("DPO Pay Raw Response:", response.data); // LOG FULL RESPONSE

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

    res.json({ TransToken: transToken });

  } catch (error) {
    console.error("Error during payment processing:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to create transaction",
      details: error.response?.data || error.message
    });
  }
});

module.exports = router;
