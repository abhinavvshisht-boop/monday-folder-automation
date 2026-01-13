const { createProjectFolder } = require("./folderService");

async function handleWebhook(req, res) {

  // ✅ monday handshake
  if (req.body.challenge) {
    return res.status(200).json({ challenge: req.body.challenge });
  }

  const event = req.body.event;

  if (!event) {
    return res.status(200).send("No event");
  }

  if (
    event.columnId !== "color_mkz7ajqt" ||
    event.value?.label?.text !== "Approved"
  ) {
    return res.status(200).send("Ignored");
  }

  try {
    console.log("Starting folder creation for item:", event.itemId);

    // ✅ IMPORTANT: await it
    await createProjectFolder(event);

    console.log("Folder created successfully");

    return res.status(200).send("Completed");
  } catch (err) {
    console.error("Folder creation failed:", err);
    return res.status(500).send("Error");
  }
}

module.exports = { handleWebhook };
