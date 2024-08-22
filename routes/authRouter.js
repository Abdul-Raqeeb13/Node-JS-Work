// routes.js
const express = require("express");
const router = express.Router();
const { signup, completeProfile, verifyOtp, login } = require("../controllers/authController");
const multer = require("multer");
const path = require("path");

// Multer storage setup
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        const uniqueString = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);  // Use path module to handle file extensions
        cb(null, "Image-" + uniqueString + ext);
    }
});

// Initialize upload with storage
const upload = multer({ storage: storage });

// Routes
router.post("/signup", signup);
router.post("/verifyOtp", verifyOtp);
router.post("/completeProfile", upload.single("image"), completeProfile);
router.post("/login" , login)

module.exports = router;
