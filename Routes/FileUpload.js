const express = require("express");
const router = express.Router();

// feching controller functions from Controller
const {
  imageUpload,
  videoUpload,
  imageReducerUpload,
  localFileUpload,
} = require("../Controllers/fileUpload");

// api routes
router.post("/localFileUpload", localFileUpload);
router.post("/imageReducerUpload", imageReducerUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageUpload", imageUpload);

module.exports = router;
