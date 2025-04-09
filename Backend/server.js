const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();
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
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  preflightContinue: true
}));

// Connect to Database
connectDB();

// Basic Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// API Routes
app.use("/api/users", require("./routes/UserRoutes"));
app.use("/api/cars", require("./routes/carRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/tradeins", require("./routes/tradeInRoutes"));
app.use("/api/testdrives", require("./routes/testDriveRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/negotiations", require("./routes/negotiationRoutes"));
app.use("/api/deliveries", require("./routes/deliveryRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err);
    
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (process.env.NODE_ENV === "development") {
        console.error("Stack trace:", err.stack);
    }

    res.status(statusCode).json({
        success: false,
        error: message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`MongoDB URI: ${process.env.MONGO_URI}`);
    console.log(`JWT Secret: ${process.env.JWT_SECRET ? "Set" : "Not set"}`);
});
