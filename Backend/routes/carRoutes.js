const express = require('express');
const router = express.Router();
const { getCars, getCarById, createCar, updateCar, deleteCar } = require('../controllers/carController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getCars);
router.get('/:id', getCarById);

// Protected routes (logged-in users only)
router.use(protect);
router.post('/', protect, adminOnly, createCar); // Removed adminOnly temporarily
router.put('/:id', protect, adminOnly, updateCar);
router.delete('/:id', protect, adminOnly, deleteCar);

module.exports = router;
