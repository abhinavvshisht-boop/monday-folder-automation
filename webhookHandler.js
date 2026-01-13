const { createProjectFolder } = require("./folderService");

async function handleWebhook(req, res) {
  const event = req.body.event;

  if (!event) {
    return res.status(200).send("No event");
  }

  if (
    event.columnId !== color_mkz7ajqt ||
    event.value?.label?.text !== "Approved"
  ) {
    return res.status(200).send("Ignored");
  }

  try {
    await createProjectFolder(event);
    res.status(200).send("Processed");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
}

module.exports = { handleWebhook };
