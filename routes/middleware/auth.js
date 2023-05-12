async function tokenAuth(req, res, next) {
  if (!req.headers.token) return res.status(401).send({ error: 'No token provided.' });
  let user = await req.db.user.getOne({ 'tokens.upload': req.headers.token })
  if (!user) return res.status(401).send({ error: 'user not found' })
  req.user = user
  next()
}
async function checkAuth(req, res, next) {
  if (!req.cookies.TOKEN) return res.status(401).json({ code: 0001, error: 'No token provided.' });
  let user = await req.db.user.getOne({ "tokens.webTokens": { $elemMatch: { token: req.cookies.TOKEN } } })
  if (!user) return res.status(401).json({ code: 0003, error: 'user not found' })
  // if (user.tokens.webTokens.find(i => i.token === req.cookies.TOKEN).expires > Date.now()) return res.status(401).json({ code: 0002, error: 'Invalid token.' });
  req.user = user
  next()
}
module.exports = {
  tokenAuth,
  checkAuth
}