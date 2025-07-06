const asyncHandler = require("express-async-handler");
const Delivery = require("../models/Delivery");

// Fetch all deliveries
const getDeliveries = asyncHandler(async (req, res) => {
  const deliveries = await Delivery.find({});
  res.json(deliveries);
});

// Create a delivery
const createDelivery = asyncHandler(async (req, res) => {
  const { orderId, status, deliveryDate } = req.body;
  const delivery = await Delivery.create({ orderId, status, deliveryDate });
  res.status(201).json(delivery);
});

// Update delivery status
const updateDelivery = asyncHandler(async (req, res) => {
  const delivery = await Delivery.findById(req.params.id);
  if (delivery) {
    delivery.status = req.body.status || delivery.status;
    delivery.deliveryDate = req.body.deliveryDate || delivery.deliveryDate;
    const updatedDelivery = await delivery.save();
    res.json(updatedDelivery);
  } else {
    res.status(404).json({ message: "Delivery not found" });
  }
});

module.exports = { getDeliveries, createDelivery, updateDelivery }; // FIXED: No incorrect function name
