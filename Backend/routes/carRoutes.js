const express = require('express');
const router = express.Router();
const {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  approveCarListing,
  rejectCarListing,
  getPendingCustomerCars
} = require('../controllers/carController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const sanitized = file.originalname.replace(/\s+/g, '-');
    const uniqueSuffix = `${Date.now()}-${sanitized}`;
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage });

// 🔓 Public route
router.get('/', getCars);

// 🛡 Protected routes (after this, `req.user` is available)
router.use(protect);

// 🚗 All users (admin or customer) can submit cars through this route
router.post('/', upload.array('images'), createCar);

// ✅ Admin-only routes
router.put('/:id', adminOnly, updateCar);
router.delete('/:id', adminOnly, deleteCar);
router.put('/:id/approve', adminOnly, approveCarListing);
router.put('/:id/reject', adminOnly, rejectCarListing);
router.get('/pending/review', adminOnly, getPendingCustomerCars);

// 👇 Single car fetch must come last to avoid route conflicts
router.get('/:id', getCarById);

module.exports = router;
