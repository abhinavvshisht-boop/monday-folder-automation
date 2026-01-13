const axios = require("axios");

const API_URL = "https://api.monday.com/v2";
const TOKEN = process.env.MONDAY_TOKEN;

if (!TOKEN) {
  console.error("❌ MONDAY_TOKEN is missing in environment variables");
}

async function query(query, variables = {}) {
  try {
    console.log("📡 Sending query to monday...");
    const response = await axios.post(
      API_URL,
      { query, variables },
      {
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ monday raw response:", JSON.stringify(response.data, null, 2));

    if (response.data.errors) {
      console.error("❌ monday GraphQL errors:", response.data.errors);
      throw new Error("Monday GraphQL Error");
    }

    return response.data;
  } catch (err) {
    console.error("🔥 MONDAY API CALL FAILED");
    console.error("Message:", err.message);
    console.error("Response:", err.response?.data);
    throw err;
  }
}

module.exports = { query };
