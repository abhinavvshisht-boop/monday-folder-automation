const { handleWebhook } = require("../webhookHandler");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await handleWebhook(req, res);
  } catch (error) {
    console.error("Vercel webhook error:", error);
    res.status(500).json({ error: "Webhook failed" });
  }
};
