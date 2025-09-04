const { z } = require("zod");

// ✅ Register Schema
const registerSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must not be more than 255 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(1024, { message: "Password can't be greater than 1024 characters" }),
});

// ✅ Login Schema
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must not be more than 255 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(1024, { message: "Password can't be greater than 1024 characters" }),
});

module.exports = { registerSchema, loginSchema };


