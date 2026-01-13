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

  // ✅ respond immediately
  res.status(200).send("Accepted");

  // ✅ trigger worker (non-blocking)
  fetch(`${process.env.VERCEL_URL}/api/create-folder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event })
  }).catch(err => console.error("Worker trigger failed:", err));
}

module.exports = { handleWebhook };
    