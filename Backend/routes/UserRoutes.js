const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  registerUser,
  registerAdmin,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUserRole,
  refreshToken
} = require("../controllers/userController");

console.log("🔹 Loaded User Routes:", {
  registerUser,
  registerAdmin,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUserRole,
  refreshToken
}); // ✅ Debugging log to confirm controllers are imported

const router = express.Router();

/**  
 * ✅ Public Routes  
 */
router.post("/register", registerUser);
router.post("/admin-register", registerAdmin);
router.post("/login", loginUser);

/**  
 * ✅ Protected User Routes  
 */
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post('/refresh-token', refreshToken);

/**  
 * ✅ Admin-Only Routes  
 */
router.get("/", protect, adminOnly, getUsers);
router.put("/:id/role", protect, adminOnly, updateUserRole); // 🔹 Ensure role update is above user fetching by ID
router.get("/:id", protect, adminOnly, getUserById);
router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;
