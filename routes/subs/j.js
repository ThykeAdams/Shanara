const { Router } = require('express');
const router = Router();
const { parse, extname } = require('path')
const { randomUUID } = require('crypto');
const moment = require("moment")


router.get("/:id", async (req, res) => {
  function TagEmbeds(str, user) {
    return str
      .replace(/{application.from}/g, 'Chrome')
      .replace(/{user.name}/g, user?.username || "Cant Find User")
      .replace(/\{date\:(.*?)\}/g, (m, format) => {
        return moment(Date.now()).format(format);
      });
  }
  const { id } = req.params;
  const data = await req.db.upload.getOne({ uid: id })
  const user = await req.db.user.getOne({ userId: data.userId })
  res.json({
    "version": "1.0",
    "author_name": TagEmbeds(user?.embed?.provider),
    "provider_name": TagEmbeds(user?.embed?.author, user),
  })
})

module.exports = router