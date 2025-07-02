const express = require("express");
const router = express.Router();

const uploadMiddleware = require("../middlewares/uploadMiddleware");
const { uploadFile, fetchFile } = require("../controllers/fileUpload");

router.post("/upload", uploadMiddleware.single("file"), uploadFile);

router.get("/upload", fetchFile);

module.exports = router;
