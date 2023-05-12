const { model, Schema } = require("mongoose");
const { randomUUID } = require("crypto");
let schema = new Schema({
  userId: { type: String, required: true, unique: true },
  userName: { type: String, default: "" },
  latest: { type: Array, default: [] },
  domain: { type: String, default: "shanara.host" },
  domains: { type: Array, default: [] },
  plan: { type: String, default: "free" },
  permLevel: { type: Number, default: 0 },
  settings: {
    autoCache: { type: Boolean, default: true },
    useSignedUrls: { type: Boolean, default: true },
  },
  embed: {
    enabled: { type: Boolean, default: true },
    title: { type: String, default: "from {application.from}" },
    description: { type: String, default: "Uploaded on {date:MM/YYYY}" },
    provider: { type: String, default: "Shanara.host" },
    author: { type: String, default: "Uploaded by: {user.name}" },
    color: { type: String, default: "#0000ff" },
  },
  tokens: {
    upload: { type: String, default: () => `${randomUUID()}.${randomUUID()}` },
    webTokens: { type: Array, default: [] },
  },
  stats: {
    uploads: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
});
module.exports = model("user", schema);
