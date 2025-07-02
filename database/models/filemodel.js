const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: String,
      required: false,
    },
    extractedText: {
      type: String,
    },
    summary: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
