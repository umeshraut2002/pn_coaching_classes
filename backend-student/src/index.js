const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");
const fs = require("fs");

const { config } = require("./lib/config");
const { connectDb } = require("./lib/db");

const healthRoutes = require("./routes/health");
const studentRoutes = require("./routes/students");

async function main() {
  await connectDb(config.mongodbUri);

  if (!fs.existsSync(config.uploadDir)) fs.mkdirSync(config.uploadDir, { recursive: true });

  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(morgan("combined"));
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.use(
    cors({
      origin: (origin, cb) => {
        if (!origin) return cb(null, true);
        if (config.allowedOrigins.length === 0) return cb(null, true);
        if (config.allowedOrigins.includes(origin)) return cb(null, true);
        return cb(new Error("CORS_NOT_ALLOWED"));
      },
      credentials: true
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

  app.get("/", (_req, res) => res.json({ ok: true, service: "student" }));

  // Serve uploaded docs (dev convenience). In production prefer S3.
  app.use("/uploads", express.static(path.resolve(config.uploadDir)));

  app.use("/", healthRoutes);
  app.use("/", studentRoutes);

  // Error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    const status = err.message === "UNSUPPORTED_FILE_TYPE" ? 400 : err.statusCode || 500;
    res.status(status).json({
      ok: false,
      error: status === 500 ? "INTERNAL_ERROR" : err.code || "ERROR",
      message: config.nodeEnv === "production" ? undefined : err.message
    });
  });

  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`[student] listening on :${config.port}`);
  });
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error("[student] failed to start", e);
  process.exit(1);
});

