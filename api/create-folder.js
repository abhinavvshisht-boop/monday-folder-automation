const { createProjectFolder } = require("../folderService");

module.exports = async (req, res) => {
  console.log("🚀 Worker endpoint hit");

  try {
    const { event } = req.body;

    if (!event) {
      console.error("❌ No event received");
      return res.status(400).send("No event");
    }

    await createProjectFolder(event);
    return res.status(200).send("Done");
  } catch (err) {
    console.error("🔥 Worker crashed");
    return res.status(500).send("Error");
  }
};
