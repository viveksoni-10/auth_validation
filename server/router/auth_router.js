const express = require("express");
const validate = require("../middlewares/validate-middleware");
const { registerSchema, loginSchema } = require("../validators/auth-validator");
const authControllers = require("../controllers/auth_controller");
const authMiddleware = require("../middlewares/auth-Middleware");

const router = express.Router();

// Register route
router.post("/register", validate(registerSchema), authControllers.register);

// Login route
router.post("/login", validate(loginSchema), authControllers.login);

// Protected route
router.get("/user", authMiddleware, authControllers.user);

module.exports = router;
