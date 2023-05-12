const { Router } = require('express');
const router = Router();
const { parse, extname } = require('path')
const { randomUUID } = require('crypto');
const { userInfo } = require('os');

router.get("/download", async (req, res) => {
  var text = JSON.stringify({
    "Version": "13.4.0",
    "Name": "Shanara",
    "DestinationType": "ImageUploader, TextUploader, FileUploader",
    "RequestMethod": "POST",
    "RequestURL": "https://shanara.host/api/upload",
    "Headers": {
      "token": req.user.tokens.upload
    },
    "Body": "MultipartFormData",
    "FileFormName": "file",
    "URL": "$json:file.url$",
    "DeletionURL": "$json:file.delete_url$"
  });
  res.attachment('config.scxu')
  res.type('txt')
  res.send(text);
})

router.post("/domain/add", async (req, res) => {
  req.logger.info(`${req.user.id} has requested the addition of domain ${req.body.domain}`)
  if (!req.body.domain) return res.status(400).json({
    error: "No domain provided"
  })
  if (req.body.domain.length > 63) return res.status(400).json({
    error: "Domain must be less than 63 characters"
  })
  if (req.body.domain.length < 3) return res.status(400).json({
    error: "Domain must be at least 3 characters"
  })
  if (req.user.domains.includes(req.body.domain)) return res.status(400).json({
    error: "Domain already exists"
  })
  if (req.body.domain.match(/^[0-9]/)) return res.status(400).json({
    error: "Domain cannot start with a number"
  })
  let d = await req.nginx.createHost(req.body?.domain)
  req.user.domains.push(d)
  req.user.domain = d.domain_names[0]
  req.user.save()
  res.json(d)
})


router.post("/embed", async (req, res) => {
  let object = Object.assign({}, req.body)
  req.user.embed.enabled = object.enabled
  req.user.embed.title = object.title
  req.user.embed.description = object.description
  req.user.embed.provider = object.provider
  req.user.embed.author = object.author
  req.user.embed.color = object.color
  await req.user.save()
  res.json({ err: false, msg: "saved" })
})

module.exports = router