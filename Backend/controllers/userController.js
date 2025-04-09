const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc Register new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please fill in all fields");
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            res.status(400);
            throw new Error("Please enter a valid email address");
        }

        if (password.length < 6) {
            res.status(400);
            throw new Error("Password must be at least 6 characters long");
        }

        const lowerEmail = email.toLowerCase();
        const userExists = await User.findOne({ email: lowerEmail });

        if (userExists) {
            res.status(400);
            throw new Error("Email is already registered");
        }

        const user = await User.create({
            name: name.trim(),
            email: lowerEmail,
            password: password, // Password will be hashed by the pre-save middleware
            role: "customer"
        });

        if (user) {
            res.status(201).json({
                success: true,
                message: "Registration successful! Login to access the customer dashboard...",
                redirectTo: "/login",
                redirectDelay: 5000, // 5 seconds delay for frontend to use
                data: {
                    name: user.name,
                    email: user.email
                }
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: error.message || 'Registration failed',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// @desc Register admin user
// @route POST /api/users/admin-register
// @access Public
const registerAdmin = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, adminCode } = req.body;

        // Validate admin code
        if (adminCode !== process.env.ADMIN_REGISTRATION_CODE) {
            return res.status(400).json({ error: "Invalid admin code" });
        }

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        // Validate email format
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ error: "Please enter a valid email address" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        const userEmail = email.toLowerCase();
        const userExists = await User.findOne({ email: userEmail });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "Email is already registered"
            });
        }

        // Create user without hashing password - it will be hashed by pre-save middleware
        const user = await User.create({
            name: name.trim(),
            email: userEmail,
            password: password,
            role: "admin"
        });

        if (user) {
            return res.status(201).json({
                success: true,
                message: "Admin account created successfully! Login to access your admin dashboard...",
                redirectTo: "/admin/login",
                redirectDelay: 5000,
                data: {
                    name: user.name,
                    email: user.email
                }
            });
        }

        return res.status(400).json({
            success: false,
            message: "Failed to create admin user"
        });
    } catch (error) {
        console.error("Admin registration error:", error);
        
        // Handle specific MongoDB errors
        if (error.code === 11000) {
            res.status(400);
            throw new Error("Email is already registered");
        }
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            res.status(400);
            throw new Error(Object.values(error.errors).map(val => val.message).join(', '));
        }
        
        // Handle bcrypt errors
        if (error.name === 'BcryptError') {
            res.status(500);
            throw new Error("Password hashing failed");
        }
        
        // Default error handling
        res.status(500).json({
            success: false,
            message: error.message || 'Admin registration failed'
        });
    }
});

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', { email }); // Log the email being tried

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        console.log('User found:', user ? 'Yes' : 'No'); // Log if user was found

        if (!user) {
            console.log('User not found');
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await user.matchPassword(password);
        console.log('Password match:', isMatch ? 'Yes' : 'No'); // Log password match result

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // If we get here, login is successful
        const redirectPath = user.role === "admin" ? "/admin-dashboard" : "/customer/dashboard";
        
        return res.status(200).json({
            success: true,
            message: "Login successful",
            redirectTo: redirectPath,
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during login. Please try again."
        });
    }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");

    if (user) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const { name, email, currentPassword, newPassword } = req.body;

        // Validate email format if provided
        if (email && !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address"
            });
        }

        // Check if email is already taken by another user
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email: email.toLowerCase() });
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: "Email is already registered"
                });
            }
        }

        // If trying to change password, verify current password
        if (newPassword) {
            if (!currentPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Current password is required to change password"
                });
            }

            const isMatch = await user.matchPassword(currentPassword);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Current password is incorrect"
                });
            }

            // Validate new password
            if (newPassword.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: "New password must be at least 6 characters long"
                });
            }
        }

        // Update user fields
        user.name = name || user.name;
        if (email) user.email = email.toLowerCase();
        if (newPassword) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        const updatedUser = await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                _id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role
            },
            token: generateToken(updatedUser.id)
        });
    } catch (error) {
        console.error('Profile update error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || "An error occurred while updating profile"
        });
    }
});

// @desc Delete a user (Admin only)
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    await user.deleteOne();
    res.json({ message: "User removed successfully" });
});

// @desc Update user role (Admin only)
// @route PUT /api/users/:id/role
// @access Private/Admin
const updateUserRole = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (req.body.role && req.body.role !== "admin" && req.body.role !== "customer") {
        res.status(400);
        throw new Error("Invalid role");
    }

    user.role = req.body.role || user.role;
    const updatedUser = await user.save();
    res.json({ message: `User role updated to ${updatedUser.role}` });
});

// @desc Get all users (Admin only)
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password");
    res.json(users);
});

// @desc Get user by ID (Admin only)
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.json(user);
});

// Export all controllers
module.exports = {
    registerUser,
    registerAdmin,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUserRole
};
