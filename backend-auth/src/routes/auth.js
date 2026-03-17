const express = require("express");
const bcrypt = require("bcryptjs");
const { z } = require("zod");

const Admin = require("../models/Admin");
const { signAdminToken } = require("../lib/jwt");
const { config } = require("../lib/config");

const router = express.Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

router.post("/login", async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() });
    }

    const { email, password } = parsed.data;
    const admin = await Admin.findOne({ email: email.toLowerCase() }).lean();
    if (!admin) return res.status(401).json({ ok: false, error: "INVALID_CREDENTIALS" });

    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) return res.status(401).json({ ok: false, error: "INVALID_CREDENTIALS" });

    const token = signAdminToken(
      { adminId: String(admin._id), email: admin.email, role: admin.role },
      config.jwt
    );

    res.json({
      ok: true,
      token,
      admin: { id: String(admin._id), email: admin.email, role: admin.role }
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;

