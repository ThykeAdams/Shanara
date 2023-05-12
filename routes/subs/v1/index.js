const { Router } = require("express");
const router = Router();

router.use("/upload", require("./upload"));

module.exports = router;
