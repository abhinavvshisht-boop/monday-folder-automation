const { createProjectFolder } = require("./folderService");

async function handleWebhook(req, res) {

  // ✅ STEP A: MONDAY HANDSHAKE (MOST IMPORTANT)
  if (req.body.challenge) {
    return res.status(200).json({ challenge: req.body.challenge });
  }

  const event = req.body.event;

  if (!event) {
    return res.status(200).send("No event");
  }

  // ⚠️ Use COLUMN ID, not name
  if (
    event.columnId !== "color_mkz7ajqt" ||
    event.value?.label?.text !== "Approved"
  ) {
    return res.status(200).send("Ignored");
  }

  try {
    await createProjectFolder(event);
    return res.status(200).send("Processed");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error");
  }
}

module.exports = { handleWebhook };
