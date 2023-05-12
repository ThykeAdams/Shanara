const { Router } = require('express');
const router = Router();
const { parse, extname } = require('path')
const { randomUUID } = require('crypto');

function checkPerm(req, res, next) {
  if (req.user.permLevel < 7) return res.json({ code: 1004, err: true, msg: "You don't have permission to do that, you are not a staff member." })
  next()
}
router.get("/users", checkPerm, async (req, res) => {
  if (req.user.permLevel < 10) return res.json({ code: 1004, err: true, msg: "You don't have permission to do that." })
  const users = await req.db.user.get()
  res.json(users)
})

router.delete("/user/:id", checkPerm, async (req, res) => {
  if (req.user.permLevel < 10) return res.json({ code: 1004, err: true, msg: "You don't have permission to do that." })
  await req.db.user.deleteOne({ userId: req.params.id })
  await req.db.upload.delete({ userId: req.params.id })
  res.json({ err: false, msg: "User deleted." })
})

module.exports = router