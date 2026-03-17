require("dotenv").config();

function must(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3001),
  mongodbUri: must("MONGODB_URI"),
  jwt: {
    secret: must("JWT_SECRET"),
    issuer: process.env.JWT_ISSUER || "pn-auth",
    audience: process.env.JWT_AUDIENCE || "pn-admin",
    expiresIn: process.env.JWT_EXPIRES_IN || "8h"
  },
  seedAdmin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  },
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
};

module.exports = { config };

