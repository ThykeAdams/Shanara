const { Router } = require('express');
const router = Router();
const { parse, extname } = require('path')
const { randomUUID } = require('crypto');
const { getHashSummer } = require('minio/dist/main/transformers');


router.get("/login", async (req, res) => {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${req.config.discord.clientId}&redirect_uri=${req.config.discord.redirect}&response_type=code&scope=identify`)
})

router.get("/callback", async (req, res) => {
  let code = req.query.code;
  try {
    const result = await getUser({ code });
    if (!result) res.redirect("/login");
    const [user, { refresh_token, access_token }] = result;
    const cacheKey = `${createKey(20)}.${createKey(22)}`;
    await req.redis.setex(`SHANARA:WEB:USER:TOKEN:${cacheKey}`, 604800, user.id);
    let DBUser = await req.db.user.getOne({ userId: user.id });
    if (!DBUser) DBUser = await req.db.user.create({ userId: user.id, userName: user.username });
    DBUser.tokens.webTokens.push({ expires: Date.now() + (1000 * 604800), token: cacheKey });
    DBUser.save()
    let expireDateNow = new Date();
    res.cookie("TOKEN", cacheKey, {
      httpOnly: true,
      expire: expireDateNow.setSeconds(expireDateNow.getSeconds() + 604800),
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secret: "ShanaraKeyBoopBeepBap"
    });
    return res.redirect("/dash");
  } catch (error) {
    console.error(error);
    return res.redirect("/login?error=true");
  }
  async function getUser(opts) {
    let access_token, refresh_token;
    if (!opts.access_token) {
      let json = await refreshUser(opts);
      access_token = json.access_token;
      refresh_token = json.refresh_token;
    } else {
      access_token = opts.access_token;
      refresh_token = opts.refresh_token;
    }

    let user = await fetch(`https://discord.com/api/users/@me`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(res => res.json());

    if (user.code === 0) return false;

    return [user, { refresh_token, access_token }];
  };
  async function refreshUser(opts) {
    const params = new URLSearchParams();
    params.append("client_id", req.config.discord.clientId);
    params.append("client_secret", req.config.discord.clientSecret);
    params.append("redirect_uri", `${req.config.discord.redirect}`);
    params.append("scope", "identify+email+guilds");

    if (opts.code) {
      params.append("grant_type", "authorization_code");
      params.append("code", opts.code);
    } else if (opts.refresh_token) {
      params.append("grant_type", "refresh_token");
      params.append("code", opts.refresh_token);
    }

    const response = await fetch(`https://discord.com/api/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });
    let json = await response.json();
    return json;
  };
});

module.exports = router

function createKey(len = 10) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < len; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
