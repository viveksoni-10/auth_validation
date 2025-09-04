const express = require("express");
const adminController = require("../controllers/admin_controller");
const authMiddleware = require("../middlewares/auth-Middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const router = express.Router();

// ✅ Get all users
router.route("/users").get(authMiddleware, adminMiddleware, adminController.GetAllUsers);

// ✅ Get single user by ID
router.route("/users/:id").get(authMiddleware, adminMiddleware, adminController.GetUserById);

// ✅ Update user by ID
router.route("/users/update/:id").put(authMiddleware, adminMiddleware, adminController.UpdateUserById);

// ✅ Delete user by ID
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

// ✅ Get all contacts
router.route("/contacts").get(authMiddleware, adminMiddleware, adminController.GetAllContacts);

// ✅ Delete contact by ID
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteContact);


module.exports = router;
