const express = require('express');
const router = express.Router();
const {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
} = require('../controllers/carController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Multer setup for image uploads
const multer = require('multer'); 
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const sanitized = file.originalname.replace(/\s+/g, '-'); // Replace spaces with -
    const uniqueSuffix = `${Date.now()}-${sanitized}`;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage });

// 🔓 Public routes
router.get('/', getCars);
router.get('/:id', getCarById);

// 🔒 Protected routes
router.use(protect);

// 🆕 Create car with image upload (admin only)
router.post('/', adminOnly, upload.array('images'), createCar);

// 🛠 Update & delete cars (admin only)
router.put('/:id', adminOnly, updateCar);
router.delete('/:id', adminOnly, deleteCar);

module.exports = router;
