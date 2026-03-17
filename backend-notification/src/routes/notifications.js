const express = require("express");
const { z } = require("zod");

const { config } = require("../lib/config");
const { sendMail } = require("../lib/mailer");

const router = express.Router();

const admissionSubmittedSchema = z.object({
  studentId: z.string().min(1),
  fullName: z.string().min(1),
  classLevel: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(8)
});

const statusUpdatedSchema = z.object({
  studentId: z.string().min(1),
  fullName: z.string().min(1),
  status: z.enum(["approved", "rejected", "pending"]),
  email: z.string().email(),
  phoneNumber: z.string().min(8)
});

router.post("/notifications/admission-submitted", async (req, res, next) => {
  try {
    const parsed = admissionSubmittedSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() });
    }

    const { fullName, classLevel, email, phoneNumber, studentId } = parsed.data;
    const subject = "Admission form received - Pranita Nasare Coaching Classes";
    const text = [
      `Hello ${fullName},`,
      "",
      "We received your admission application.",
      `Class: ${classLevel}`,
      `Phone: ${phoneNumber}`,
      `Application ID: ${studentId}`,
      "",
      "We will get back to you soon.",
      "",
      "Regards,",
      "Pranita Nasare Coaching Classes"
    ].join("\n");

    await sendMail(req.mailer, { from: config.mail.from, to: email, subject, text });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

router.post("/notifications/status-updated", async (req, res, next) => {
  try {
    const parsed = statusUpdatedSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() });
    }

    const { fullName, status, email, studentId } = parsed.data;
    const subject = `Admission status update: ${status.toUpperCase()}`;
    const text = [
      `Hello ${fullName},`,
      "",
      `Your admission application status is now: ${status.toUpperCase()}`,
      `Application ID: ${studentId}`,
      "",
      "Regards,",
      "Pranita Nasare Coaching Classes"
    ].join("\n");

    await sendMail(req.mailer, { from: config.mail.from, to: email, subject, text });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

module.exports = router;

