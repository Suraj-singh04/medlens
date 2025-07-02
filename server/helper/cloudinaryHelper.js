const cloudinary = require("../config/cloudinary");
const path = require("path");

const uploadToCloudinary = async (filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const isPDF = ext === ".pdf";

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: isPDF ? "raw" : "image",
      folder: "uploads",
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.log("Error while uploading to cloudinary", error);
    throw new Error("Cloudinary upload failed");
  }
};

module.exports = {
  uploadToCloudinary,
};
