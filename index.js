const next = require("next");
const express = require("express");
const cors = require("cors");
const Minio = require("minio");
const cookies = require("cookie-parser");
// const Sentry = require("@sentry/node");
const mongoose = require("mongoose");

const config = require("./config");
const funcs = require("./utils/funcs.server");
const Logger = require("./utils/Logger");
const NginxManager = require("./utils/nginx");
const DB = require("./database/db");
const app = next({ dev: config.dev });
const handle = app.getRequestHandler();

const s3Client = new Minio.Client({
  endPoint: config.s3.host,
  useSSL: true,
  accessKey: config.s3.id,
  secretKey: config.s3.secret,
});
// Sentry.init({
//   dsn: config.sentryDSN,
//   tracesSampleRate: 1.0,
// });

app
  .prepare()
  .then(async () => {
    const nginx = new NginxManager(config);
    const server = express();
    const logger = new Logger(config);
    const db = new DB();
    const redis = new (require("ioredis"))(config.redis);
    redis.once("ready", () => {
      logger.ready("Redis Connected");
    });
    mongoose.connect(config.mongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.once("connected", () => {
      logger.ready("Database Connected");
    });
    server.use(
      cors({
        origin: "*",
      })
    );
    server.use(express.json(), cookies());
    server.use((req, res, next) => {
      req.logger = logger;
      req.config = config;
      req.s3 = s3Client;
      req.db = db;
      req.redis = redis;
      req.funcs = funcs;
      req.nginx = nginx;
      logger.debug(`${req.method} ${req.url} -|- ${req.headers["x-forwarded-for"]}\n${req.headers}`);
      next();
    });
    server.use("/api", require("./routes/api"));

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.use((err, req, res, next) => {
      if (err.name === "Error") {
        res.status(401).send({
          title: "error",
          detail: "Unauthorized Access!",
        });
      }
    });

    server.listen(config.site.port || 3000, (err) => {
      if (err) throw err;
      logger.ready(`> Ready on port: ${config.site.port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
process.on("uncaughtException", function (err) {
  fetch(config.discord.webhooks.error, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Shanara Error Cathcing",
      avatar_url: "https://cdn.trit.wtf/assets/logos/shanara.png",
      content: `<@376901199225552898>`,
      embeds: [
        {
          title: "Error",
          description: `\`\`\`js\n${err}\`\`\``,
          color: "RED",
        },
      ],
    }),
  });
});
