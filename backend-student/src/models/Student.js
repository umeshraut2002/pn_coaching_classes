const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    storagePath: { type: String, required: true }
  },
  { _id: false }
);

const StudentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, index: true },
    classLevel: { type: String, required: true, enum: ["7th", "8th", "9th", "10th"], index: true },
    schoolName: { type: String, required: true },
    parentName: { type: String, required: true },
    phoneNumber: { type: String, required: true, index: true },
    email: { type: String, required: true, index: true },
    address: { type: String, required: true },
    documents: { type: [DocumentSchema], default: [] },
    status: { type: String, required: true, enum: ["pending", "approved", "rejected"], default: "pending", index: true }
  },
  { timestamps: true }
);

StudentSchema.index({ fullName: "text", phoneNumber: "text", email: "text", schoolName: "text", parentName: "text" });

module.exports = mongoose.model("Student", StudentSchema);

