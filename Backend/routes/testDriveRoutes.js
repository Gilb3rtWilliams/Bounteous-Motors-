const express = require("express");
const TestDrive = require("../models/TestDrive");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getTestDrives,
  createTestDrive,
  updateTestDriveStatus,
} = require("../controllers/testDriveController");

const router = express.Router();

// User Routes
router.post("/", protect, createTestDrive);

// Admin Routes
router.get("/", protect, adminOnly, getTestDrives);
router.put("/:id/status", protect, adminOnly, updateTestDriveStatus);

// Schedule a test drive
router.post("/", async (req, res) => {
  try {
    const testDrive = new TestDrive(req.body);
    await testDrive.save();
    res.status(201).json({ message: "Test drive scheduled successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all test drives
router.get("/", async (req, res) => {
  const testDrives = await TestDrive.find().populate("user").populate("car");
  res.json(testDrives);
});

// Get test drive by ID
router.get("/:id", async (req, res) => {
  const testDrive = await TestDrive.findById(req.params.id).populate("user").populate("car");
  if (!testDrive) return res.status(404).json({ message: "Test drive not found" });
  res.json(testDrive);
});

module.exports = router;
