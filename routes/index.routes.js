const router = require("express").Router(); // Require express to create routes

// Require Schemas connected to MONGODB
const User = require("../models/User.model");
const Goal = require("../models/Goal.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
