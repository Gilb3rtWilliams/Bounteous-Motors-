const asyncHandler = require("express-async-handler");
const TestDrive = require("../models/TestDrive");

// Fetch all test drive bookings (Admin only)
const getTestDrives = asyncHandler(async (req, res) => {
  const testDrives = await TestDrive.find({}).populate("user", "name email");
  res.json(testDrives);
});

// Create a new test drive booking
const createTestDrive = asyncHandler(async (req, res) => {
  const { user, car, date, location, status } = req.body;
  const testDrive = await TestDrive.create({ user, car, date, location, status });

  if (testDrive) {
    res.status(201).json(testDrive);
  } else {
    res.status(400).json({ message: "Invalid test drive data" });
  }
});

// Update test drive status
const updateTestDriveStatus = asyncHandler(async (req, res) => {
  const testDrive = await TestDrive.findById(req.params.id);
  if (testDrive) {
    testDrive.status = req.body.status || testDrive.status;
    const updatedTestDrive = await testDrive.save();
    res.json(updatedTestDrive);
  } else {
    res.status(404).json({ message: "Test drive not found" });
  }
});

module.exports = { getTestDrives, createTestDrive, updateTestDriveStatus };
