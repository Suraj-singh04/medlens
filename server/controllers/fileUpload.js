const { spawn } = require("child_process");
const path = require("path");
const File = require("../../database/models/filemodel");
const { uploadToCloudinary } = require("../helper/cloudinaryHelper");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    const ocrScript = path.join(__dirname, "../ocr/ocr.py");
    const ocrProcess = spawn("python", [ocrScript, url]);

    let ocrOutput = "";

    ocrProcess.stdout.on("data", (data) => {
      ocrOutput += data.toString();
    });

    ocrProcess.stderr.on("data", (err) => {
      console.error("OCR stderr:", err.toString());
    });

    ocrProcess.on("close", async () => {
      let extractedText = "";
      try {
        const parsed = JSON.parse(ocrOutput);
        extractedText = parsed.text || "";
      } catch (e) {
        console.error("Failed to parse OCR output:", e);
      }

      // SUMMARIZATION
      const summaryProcess = spawn("python", [
        path.join(__dirname, "../ocr/summarize.py"),
        extractedText,
      ]);

      let summaryOutput = "";

      summaryProcess.stdout.on("data", (data) => {
        summaryOutput += data.toString();
      });

      summaryProcess.stderr.on("data", (err) => {
        console.error("Summary stderr:", err.toString());
      });

      summaryProcess.on("close", async () => {
        let summary = "";
        try {
          const parsed = JSON.parse(summaryOutput);
          summary = parsed.summary || "";
        } catch (e) {
          console.error("Failed to parse summary output", e);
        }

        const uploadedFile = new File({
          url,
          publicId,
          extractedText,
          summary,
        });
        await uploadedFile.save();
        console.log("✅ File saved to DB");

        return res.status(201).json({
          message: "File uploaded successfully",
          file: uploadedFile,
        });
      });
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res
      .status(500)
      .json({ error: "File upload failed. Try again later." });
  }
};

const fetchFile = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    return res.status(200).json(files || []);
  } catch (error) {
    console.log("Fetch Error:", error);
    return res.status(500).json({ error: "Error fetching files." });
  }
};

module.exports = {
  uploadFile,
  fetchFile,
};
