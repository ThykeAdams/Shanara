const { Router } = require("express");
const router = Router();
const { parse, extname } = require("path");
const { randomUUID } = require("crypto");
const { checkAuth } = require("../../../middleware/auth")

router.delete("/:id", checkAuth, async (req, res) => {
  console.log(req.user)
  const data = await req.db.upload.getOne({ uid: req.params.id });
  if (!data) return res.status(404).json({ code: 0001, error: "File not found." });
  if (data.userId !== req.user.userId) return res.status(403).json({ code: 0002, error: "You don't have permission to delete this file." });
  await req.s3.removeObject(req.config.s3.bucket, data.file.key);
  await req.db.upload.model.deleteOne({ uid: req.params.id });
  res.json({
    success: true,
  });

})


router.get("/:id", async (req, res) => {
  const data = await req.db.upload.getOne({ uid: req.params.id });
  let user = await req.db.user.getOne({ userId: data.userId });
  user.tokens = undefined;
  user.latest = undefined;
  user.domains = undefined;
  user.stats = undefined;
  user.settings = undefined;
  res.json({
    ...data._doc,
    user: user._doc,
  });
});

module.exports = router;
