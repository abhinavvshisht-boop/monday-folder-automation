require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { handleWebhook } = require("./webhookHandler");

const app = express();
app.use(bodyParser.json());

// Home check
app.get("/", (req, res) => {
  res.send("Monday Folder Automation is running");
});

// 🔴 ADD THIS TEST ROUTE
app.get("/test-token", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.monday.com/v2",
      { query: "{ me { name } }" },
      { headers: { Authorization: process.env.MONDAY_TOKEN } }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json(err.response?.data || err.message);
  }
});

// Webhook
app.post("/webhook", handleWebhook);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
