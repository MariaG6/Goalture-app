const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User.model')
const Goal = require('../models/Goal.model')


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;





