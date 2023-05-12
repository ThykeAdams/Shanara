const { Router } = require("express");
const { useReducer } = require("react");
const router = Router();
const { tokenAuth, checkAuth } = require("./middleware/auth");

router.use("/v1", require("./subs/v1/index"));
router.use("/j", require("./subs/j.js"));
router.use("/discord", require("./subs/discord.js"));

router.use("/upload", tokenAuth, require("./subs/uploading.js"));
router.use("/admin", checkAuth, require("./subs/admin.js"));
router.use("/config", checkAuth, require("./subs/APIconfig.js"));
router.get("/me", checkAuth, async (req, res) => {
  let data = req.user;
  data.tokens = undefined;
  res.json(data);
});

module.exports = router;
