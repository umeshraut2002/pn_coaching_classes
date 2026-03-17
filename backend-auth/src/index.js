const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcryptjs");

const { config } = require("./lib/config");
const { connectDb } = require("./lib/db");
const Admin = require("./models/Admin");

const healthRoutes = require("./routes/health");
const authRoutes = require("./routes/auth");

async function ensureSeedAdmin() {
  const existing = await Admin.countDocuments();
  if (existing > 0) return;

  const email = (config.seedAdmin.email || "").toLowerCase();
  const password = config.seedAdmin.password || "";
  if (!email || !password) {
    // No admin exists and no seed credentials provided.
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.create({ email, passwordHash, role: "admin" });
  // Intentionally no console logging of password.
}

async function main() {
  await connectDb(config.mongodbUri);
  await ensureSeedAdmin();

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
      },
      credentials: true
    })
  );

  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false
    })
  );

  app.get("/", (_req, res) => res.json({ ok: true, service: "auth", name: "Pranita Nasare Coaching Classes" }));

  app.use("/", healthRoutes);
  app.use("/", authRoutes);

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
    console.log(`[auth] listening on :${config.port}`);
  });
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error("[auth] failed to start", e);
  process.exit(1);
});

