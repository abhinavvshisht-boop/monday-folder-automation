const { createProjectFolder } = require("./folderService");

async function handleWebhook(req, res) {

  // ✅ Handshake
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

  // ✅ RESPOND IMMEDIATELY
  res.status(200).send("Accepted");

  // ✅ DO WORK ASYNC (DO NOT AWAIT)
  createProjectFolder(event)
    .then(() => console.log("Folder created"))
    .catch(err => console.error("Folder error:", err));
}

module.exports = { handleWebhook };
