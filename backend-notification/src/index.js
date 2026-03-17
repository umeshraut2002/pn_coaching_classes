const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const { config } = require("./lib/config");
const { connectDb } = require("./lib/db");
const { createTransport } = require("./lib/mailer");

const healthRoutes = require("./routes/health");
const notificationRoutes = require("./routes/notifications");

async function main() {
  await connectDb(config.mongodbUri);

  const mailer = createTransport(config.mail);

  const app = express();
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(morgan("combined"));
  app.use(express.json({ limit: "1mb" }));

  app.use(
    cors({
      origin: (origin, cb) => {
        if (!origin) return cb(null, true);
        if (config.allowedOrigins.length === 0) return cb(null, true);
        if (config.allowedOrigins.includes(origin)) return cb(null, true);
        return cb(new Error("CORS_NOT_ALLOWED"));
      }
    })
  );

  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      limit: 240,
      standardHeaders: true,
      legacyHeaders: false
    })
  );

  app.use((req, _res, next) => {
    req.mailer = mailer;
    next();
  });

  app.get("/", (_req, res) => res.json({ ok: true, service: "notification" }));
  app.use("/", healthRoutes);
  app.use("/", notificationRoutes);

  // Error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    const status = err.statusCode || 500;
    res.status(status).json({
      ok: false,
      error: status === 500 ? "INTERNAL_ERROR" : err.code || "ERROR",
      message: config.nodeEnv === "production" ? undefined : err.message
    });
  });

  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`[notification] listening on :${config.port}`);
  });
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error("[notification] failed to start", e);
  process.exit(1);
});

