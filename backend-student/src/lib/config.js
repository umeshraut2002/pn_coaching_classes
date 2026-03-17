require("dotenv").config();

function must(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3002),
  mongodbUri: must("MONGODB_URI"),
  jwt: {
    secret: must("JWT_SECRET"),
    issuer: process.env.JWT_ISSUER || "pn-auth",
    audience: process.env.JWT_AUDIENCE || "pn-admin"
  },
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  notificationServiceUrl: process.env.NOTIFICATION_SERVICE_URL || "http://notification:3003",
  uploadDir: process.env.UPLOAD_DIR || "uploads"
};

module.exports = { config };

