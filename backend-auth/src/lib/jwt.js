const jwt = require("jsonwebtoken");

function signAdminToken({ adminId, email, role }, jwtConfig) {
  return jwt.sign(
    { sub: adminId, email, role },
    jwtConfig.secret,
    {
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
      expiresIn: jwtConfig.expiresIn
    }
  );
}

module.exports = { signAdminToken };

