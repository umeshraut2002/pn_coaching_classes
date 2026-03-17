const jwt = require("jsonwebtoken");
const { config } = require("./config");

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const [type, token] = auth.split(" ");
  if (type !== "Bearer" || !token) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });

  try {
    const payload = jwt.verify(token, config.jwt.secret, {
      issuer: config.jwt.issuer,
      audience: config.jwt.audience
    });
    req.user = payload;
    return next();
  } catch (_e) {
    return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
    if (req.user.role !== role) return res.status(403).json({ ok: false, error: "FORBIDDEN" });
    return next();
  };
}

module.exports = { requireAuth, requireRole };

