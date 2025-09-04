const express = require("express");
const Services = require("../controllers/service_controller");
const router = express.Router();

router.route("/").get(Services);

module.exports = router;