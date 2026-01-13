const { createProjectFolder } = require("../folderService");

module.exports = async (req, res) => {
  try {
    const event = req.body.event;

    console.log("Worker started for item:", event.itemId);

    await createProjectFolder(event);

    console.log("Worker finished");

    return res.status(200).json({ status: "done" });
  } catch (err) {
    console.error("Worker error:", err);
    return res.status(500).json({ error: "failed" });
  }
};
