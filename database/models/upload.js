const { model, Schema } = require("mongoose");
const { randomUUID } = require("crypto");

const schema = new Schema({
  userId: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "user" },
  uid: { type: String, required: true, unique: true },
  file: {
    key: { type: String, required: true },
    expires: { type: Number, default: 0 },
    url: { type: String, default: "" },
    name: { type: String, default: "" },
  },
  // uploaded: { type: Date, default: () => Date.now() },
});
module.exports = model("upload", schema);
