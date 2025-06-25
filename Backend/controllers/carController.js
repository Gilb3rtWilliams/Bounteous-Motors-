const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Car = require("../models/Car");

// Fetch all cars
const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({});
  res.json(cars);
});

// Fetch a single car by ID with full details
const getCarById = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id)
    .populate('seller', 'name email') // Populate seller details
    .select('-__v'); // Exclude version key

  if (car) {
    // Enhance the car object with additional details
    const enhancedCar = {
      ...car.toObject(),
      features: car.features || [],
      performance: {
        engine: car.engine || 'Not specified',
        horsepower: car.horsepower || 'Not specified',
        acceleration: car.acceleration || 'Not specified',
        transmission: car.transmission || 'Not specified'
      },
      location: car.location || 'Not specified',
      fuelType: car.fuelType || 'Not specified'
    };
    res.json(enhancedCar);
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

// Create a new car listing
const createCar = asyncHandler(async (req, res) => {
  try {
    console.log("🔁 Incoming car listing...");
    const {
      brand,
      model,
      year,
      price,
      type,
      mileage,
      condition,
      fuelType,
      transmission,
      location,
      description,
      engine,
      horsepower,
      acceleration,
      features,
      exteriorColor,
      interiorColor,
      vin,
      bodyStyle,
      status
    } = req.body;

    // Handle image uploads
    const imagePaths = req.files ? req.files.map(file => file.filename) : [];

    // Convert features to array if passed as comma-separated string
    const parsedFeatures = typeof features === 'string'
      ? features.split(',').map(f => f.trim())
      : Array.isArray(features) ? features : [];

    // Validate required fields
    if (!brand || !model || !year || !price || !type || !condition) {
      res.status(400);
      throw new Error('Please fill in all required fields');
    }

    // Create car object
    const car = new Car({
      brand,
      model,
      year: Number(year),
      price: Number(price),
      type,
      mileage: mileage ? Number(mileage) : 0,
      condition,
      fuelType,
      transmission,
      location,
      description: description || "No description provided",
      engine,
      horsepower,
      acceleration,
      features: parsedFeatures,
      exteriorColor,
      interiorColor,
      vin,
      bodyStyle,
      status: status || 'Available',
      images: imagePaths,
      seller: req.user._id, // set by auth middleware
      createdAt: new Date(),
      lastModified: new Date()
    });

    const savedCar = await car.save();

    res.status(201).json({
      success: true,
      message: 'Car listing created successfully',
      car: savedCar
    });
  } catch (error) {
    console.error('❌ Error creating car listing:', error.message);
    res.status(500).json({
      message: 'Error creating car listing',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});


// Update a car listing
const updateCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (car) {
    car.name = req.body.name || car.name;
    car.brand = req.body.brand || car.brand;
    car.model = req.body.model || car.model;
    car.price = req.body.price || car.price;
    car.condition = req.body.condition || car.condition;
    car.description = req.body.description || car.description;
    
    const updatedCar = await car.save();
    res.json(updatedCar);
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

// Delete a car
const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (car) {
    await car.remove();
    res.json({ message: "Car deleted successfully" });
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

module.exports = { getCars, getCarById, createCar, updateCar, deleteCar };
