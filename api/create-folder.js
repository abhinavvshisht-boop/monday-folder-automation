const { createProjectFolder } = require("../folderService");

module.exports = async (req, res) => {
  try {
    const { event } = req.body;

    if (!event) {
      return res.status(400).send("No event received");
    }

    console.log("Worker started for item:", event.itemId);

    await createProjectFolder(event);

    console.log("Worker finished successfully");

    return res.status(200).send("Folder created");
  } catch (err) {
    console.error("Worker failed:", err);
    return res.status(500).send("Worker error");
  }
};
