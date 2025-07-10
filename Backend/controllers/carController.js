
const asyncHandler = require("express-async-handler");
const Car = require("../models/Car");
const Notification = require("../models/Notification");

// GET /api/cars - Fetch all cars
const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({});
  res.json(cars);
});

// GET /api/cars/:id - Fetch single car by ID
const getCarById = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id)
    .populate('seller', 'name email')
    .select('-__v');

  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }

  res.json(car);
});

// POST /api/cars - Admin creates a car listing
const createCar = asyncHandler(async (req, res) => {
  const {
    brand, model, year, price, type, mileage,
    condition, fuelType, transmission, location,
    description, engine, horsepower, acceleration,
    exteriorColor, interiorColor, vin, bodyStyle,
    features, status
  } = req.body;

  // Parse features
  let parsedFeatures = [];
  if (typeof features === 'string') {
    parsedFeatures = features.split(',').map(f => f.trim());
  } else if (Array.isArray(features)) {
    parsedFeatures = features.map(f => f.trim());
  }

  // Uploaded image filenames
  const imagePaths = req.files?.map(file => `/uploads/${file.filename}`) || [];

  const newCar = new Car({
    brand,
    model,
    year: Number(year),
    price: Number(price),
    type: type ? type.toLowerCase() : 'used', // Default to 'used' if not provided
    mileage: mileage ? Number(mileage) : 0,
    condition: condition ? condition.toLowerCase() : 'used', // Default to 'used' if not provided
    fuelType,
    transmission,
    location,
    description,
    engine,
    horsepower: horsepower ? Number(horsepower) : undefined,
    acceleration,
    features: parsedFeatures,
    exteriorColor,
    interiorColor,
    vin,
    bodyStyle,
    status: status || 'Available',
    images: imagePaths,
    seller: req.user._id,
    listedByAdmin: true
  });

  const savedCar = await newCar.save();
  res.status(201).json({
    success: true,
    message: 'Car listing created successfully',
    car: savedCar
  });
});

// POST /api/cars/customer - Customer submits a car for review
const postCustomerCar = asyncHandler(async (req, res) => {
  const {
    brand, model, year, price, type, mileage,
    condition, fuelType, transmission, location,
    description, engine, horsepower, acceleration,
    exteriorColor, interiorColor, vin, bodyStyle,
    features
  } = req.body;

  // Parse features
  let parsedFeatures = [];
  if (typeof features === 'string') {
    parsedFeatures = features.split(',').map(f => f.trim());
  } else if (Array.isArray(features)) {
    parsedFeatures = features.map(f => f.trim());
  }

  const imagePaths = req.files?.map(file => `/uploads/${file.filename}`) || [];

  const newCar = new Car({
    brand,
    model,
    year: Number(year),
    price: Number(price),
    type: type? type.toLowerCase() : 'used', // Default to 'used' if not provided
    mileage: mileage ? Number(mileage) : 0,
    condition: condition? condition.toLowerCase() : 'used', // Default to 'used' if not provided
    fuelType,
    transmission,
    location,
    description,
    engine,
    horsepower: horsepower ? Number(horsepower) : undefined,
    acceleration,
    features: parsedFeatures,
    exteriorColor,
    interiorColor,
    vin,
    bodyStyle,
    status: 'Pending',
    listedByAdmin: false,
    images: imagePaths,
    seller: req.user._id
  });

  const savedCar = await newCar.save();

  await Notification.create({
  title: `New Car Listing: ${brand} ${model}`,
  message: `New car listing submitted by ${req.user.name}`,
  type: 'car_listing_pending',
  priority: 'medium',
  recipientRole: 'admin',
  user: req.user._id,
  car: savedCar._id,
  action: {
    label: 'Review Listing',
    link: `/admin/review-listings`
  }
});

  res.status(201).json({ success: true, car: savedCar });
});

// PUT /api/cars/:id/approve - Admin approves a listing
const approveCarListing = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).json({ message: 'Car not found' });

  car.status = 'Approved';
  car.rejectionReason = '';
  await car.save();

  await Notification.create({
  title: 'Listing Approved',
  message: `Your car listing (${car.brand} ${car.model}) has been approved.`,
  type: 'car_listing_approved',
  priority: 'low',
  recipientRole: 'customer',
  user: car.seller,
  car: car._id,
  action: {
    label: 'View Listing',
    link: `/car/${car._id}`
  }
});

  res.status(200).json({ success: true, message: 'Car approved' });
});

// PUT /api/cars/:id/reject - Admin rejects a listing
const rejectCarListing = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).json({ message: 'Car not found' });

  car.status = 'Rejected';
  car.rejectionReason = reason || 'No reason provided';
  await car.save();

  await Notification.create({
  title: 'Listing Rejected',
  message: `Your listing (${car.brand} ${car.model}) was rejected. Reason: ${car.rejectionReason}`,
  type: 'car_listing_rejected',
  priority: 'high',
  recipientRole: 'customer',
  user: car.seller,
  car: car._id,
  action: {
    label: 'View Listing',
    link: `/car/${car._id}`
  }
  });

  res.status(200).json({ success: true, message: 'Car rejected' });
});

// GET /api/cars/pending/review - Admin fetches all pending customer listings
const getPendingCustomerCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({ listedByAdmin: false, status: 'Pending' }).populate('seller', 'name email');
  res.status(200).json(cars);
});

// PUT /api/cars/:id - Admin updates car details
const updateCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).json({ message: 'Car not found' });

  Object.assign(car, req.body);
  const updated = await car.save();
  res.json(updated);
});

// DELETE /api/cars/:id - Delete a car
const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).json({ message: 'Car not found' });

  await car.remove();
  res.json({ message: 'Car deleted successfully' });
});

module.exports = {
  getCars,
  getCarById,
  createCar,
  postCustomerCar,
  approveCarListing,
  rejectCarListing,
  getPendingCustomerCars,
  updateCar,
  deleteCar
};
