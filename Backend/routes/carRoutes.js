const express = require('express');
const router = express.Router();
const {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  postCustomerCar,
  approveCarListing,
  rejectCarListing,
  getPendingCustomerCars
} = require('../controllers/carController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer storage
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

// 🔓 Public routes
router.get('/', getCars);

// 🛡 Protected routes
router.use(protect);

// 🚗 Customer submits car for review — MUST BE BEFORE /:id
router.post('/customer', upload.array('images'), postCustomerCar);

// ✅ Admin-only routes
router.post('/', adminOnly, upload.array('images'), createCar);
router.put('/:id', adminOnly, updateCar);
router.delete('/:id', adminOnly, deleteCar);
router.put('/:id/approve', adminOnly, approveCarListing);
router.put('/:id/reject', adminOnly, rejectCarListing);
router.get('/pending/review', adminOnly, getPendingCustomerCars);

// 👇 This MUST come last
router.get('/:id', getCarById);

module.exports = router;
