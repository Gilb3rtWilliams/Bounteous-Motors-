const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require('cookie-parser');
const path = require('path');
require("dotenv").config();

// 📦 Load Models
require("./models/User");
require("./models/Car");
require("./models/Order");
require("./models/Payment");
require("./models/TradeIn");
require("./models/TestDrive");
require("./models/Review");
require("./models/Negotiation");
require("./models/Delivery");
require("./models/Notification");

// 🛣 Route Imports
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const userRoutes = require("./routes/UserRoutes");
const carRoutes = require("./routes/carRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const tradeInRoutes = require("./routes/tradeInRoutes");
const testDriveRoutes = require("./routes/testDriveRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const negotiationRoutes = require("./routes/negotiationRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// 🚀 Initialize Express app
const app = express();

// 🔐 Middleware
app.use(express.json());
app.use(cookieParser());

// 📂 Serve uploaded images statically from backend/uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🌍 CORS: Allow frontend to communicate with backend
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🔌 Connect to MongoDB
connectDB();

// 🚦 API Health Check
app.get("/", (req, res) => {
  res.send("🚗 Bounteous Motors API is running...");
});

// 📬 Route Mounts
app.use('/api/users', userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/tradeins", tradeInRoutes);
app.use("/api/testdrives", testDriveRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/negotiations", negotiationRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);

// ❌ Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
