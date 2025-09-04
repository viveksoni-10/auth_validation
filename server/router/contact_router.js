const express = require("express");
const router = express.Router();
const contactForm = require("../controllers/contact_controller");

// POST /api/contact
router.route("/").post(contactForm);

module.exports = router;
