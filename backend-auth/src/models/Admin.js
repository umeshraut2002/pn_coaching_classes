const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin"], default: "admin" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);

