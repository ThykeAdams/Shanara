const { Router } = require("express");
const router = Router();
const { parse, extname } = require("path");
const { randomUUID } = require("crypto");
const fetch = require("node-fetch");

router.use(require("express-fileupload")());
router.post("/", async (req, res) => {
  let cryptoKey = randomUUID();
  let key = [req.config.s3.prefix, req.user.id, cryptoKey].join("/");
  let response = await req.s3.putObject(req.config.s3.bucket, key + extname(req.files.file.name), req.files.file.data, {
    "x-amz-acl": req.user.settings.useSignedUrls ? "private" : "public-read",
  });
  let signedURL;
  if (req.user.settings.useSignedUrls) signedURL = await req.s3.presignedGetObject(req.config.s3.bucket, key + extname(req.files.file.name));
  let uid = Math.ceil(Math.random() * Date.now() * 5).toString(36);
  let db = await req.db.upload
    .create({
      userId: req.user.userId,
      user: req.user._id,
      uid,
      file: {
        key: key + extname(req.files.file.name),
        expires: signedURL ? Date.now() + 603800 : 999999999999999999999999,
        url: signedURL || `https://${req.config.s3.cleanURL}/${key}${extname(req.files.file.name)}`,
        name: req.files.file.name,
      },
    })
    .catch((err) => {
      console.log(err);
    });
  req.logger.info(`${req.user.id} uploaded ${key}`);
  if (req.user.settings.autoCache)
    await fetch(req.config.discord.webhooks.autocache, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Shanara AutoCache",
        avatar_url: "https://cdn.trit.wtf/assets/logos/shanara.png",
        content: `https://${req.user.domain}/i/${uid}`,
      }),
    });

  res.json({
    file: {
      url: `https://${req.user.domain}/i/${uid}`,
    },
  });
  req.user.latest = [db].concat(req.user.latest).slice(0, 6);
  req.user.stats.uploads++;
  req.user.save();
});

module.exports = router;
