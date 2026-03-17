const express = require("express");
const path = require("path");
const multer = require("multer");
const { z } = require("zod");

const Student = require("../models/Student");
const { requireAuth, requireRole } = require("../lib/auth");
const { config } = require("../lib/config");
const { tryNotify } = require("../lib/notify");

const router = express.Router();

const createStudentSchema = z.object({
  fullName: z.string().min(2).max(120),
  classLevel: z.enum(["7th", "8th", "9th", "10th"]),
  schoolName: z.string().min(2).max(160),
  parentName: z.string().min(2).max(120),
  phoneNumber: z.string().min(10).max(20),
  email: z.string().email(),
  address: z.string().min(5).max(400)
});

const updateStatusSchema = z.object({
  status: z.enum(["approved", "rejected"])
});

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, config.uploadDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}_${safe}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    // Accept common doc/image types
    const ok =
      file.mimetype.startsWith("image/") ||
      ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(
        file.mimetype
      );
    if (!ok) return cb(new Error("UNSUPPORTED_FILE_TYPE"));
    cb(null, true);
  }
});

// Public admission submission
router.post("/students", upload.array("documents", 3), async (req, res, next) => {
  try {
    const parsed = createStudentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() });
    }

    const docs = (req.files || []).map((f) => ({
      originalName: f.originalname,
      mimeType: f.mimetype,
      size: f.size,
      storagePath: path.join(config.uploadDir, f.filename)
    }));

    const student = await Student.create({
      ...parsed.data,
      email: parsed.data.email.toLowerCase(),
      documents: docs
    });

    // Fire-and-forget notification
    void tryNotify({
      baseUrl: config.notificationServiceUrl,
      path: "/notifications/admission-submitted",
      payload: {
        studentId: String(student._id),
        fullName: student.fullName,
        classLevel: student.classLevel,
        email: student.email,
        phoneNumber: student.phoneNumber
      }
    });

    res.status(201).json({ ok: true, id: String(student._id), status: student.status });
  } catch (e) {
    next(e);
  }
});

// Admin: list + filter/search
router.get("/students", requireAuth, requireRole("admin"), async (req, res, next) => {
  try {
    const { status, classLevel, q, limit = "50", skip = "0" } = req.query;

    const query = {};
    if (status) query.status = status;
    if (classLevel) query.classLevel = classLevel;
    if (q) query.$text = { $search: String(q) };

    const lim = Math.min(Number(limit) || 50, 200);
    const sk = Math.max(Number(skip) || 0, 0);

    const [items, total] = await Promise.all([
      Student.find(query)
        .sort({ createdAt: -1 })
        .skip(sk)
        .limit(lim)
        .select("-__v")
        .lean(),
      Student.countDocuments(query)
    ]);

    res.json({ ok: true, total, items });
  } catch (e) {
    next(e);
  }
});

// Admin: status update
router.patch("/students/:id/status", requireAuth, requireRole("admin"), async (req, res, next) => {
  try {
    const parsed = updateStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: { status: parsed.data.status } },
      { new: true }
    ).lean();

    if (!student) return res.status(404).json({ ok: false, error: "NOT_FOUND" });

    void tryNotify({
      baseUrl: config.notificationServiceUrl,
      path: "/notifications/status-updated",
      payload: {
        studentId: String(student._id),
        fullName: student.fullName,
        status: student.status,
        email: student.email,
        phoneNumber: student.phoneNumber
      }
    });

    res.json({ ok: true, item: student });
  } catch (e) {
    next(e);
  }
});

// Bonus: analytics
router.get("/students/analytics/summary", requireAuth, requireRole("admin"), async (_req, res, next) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: { status: "$status", classLevel: "$classLevel" },
          count: { $sum: 1 }
        }
      }
    ];

    const grouped = await Student.aggregate(pipeline);

    const byStatus = {};
    const byClassLevel = {};
    for (const g of grouped) {
      byStatus[g._id.status] = (byStatus[g._id.status] || 0) + g.count;
      byClassLevel[g._id.classLevel] = (byClassLevel[g._id.classLevel] || 0) + g.count;
    }

    res.json({ ok: true, byStatus, byClassLevel });
  } catch (e) {
    next(e);
  }
});

module.exports = router;

