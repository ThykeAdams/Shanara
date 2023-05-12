const { model, Schema } = require("mongoose");
const { randomUUID } = require('crypto')
module.exports = model(
  "embed",
  new Schema({
    userId: { type: String, required: true },
    embed: {
      title: { type: String, default: "from {application.from}" },
      description: { type: String, default: "Uploaded on {date:MM/YYYY}" },
      provider: { type: String, default: "Shanara.host" },
      author: { type: String, default: "Uploaded by: {user.name}" },
      color: { type: String, default: "#0000ff" },
    }
  })
)
