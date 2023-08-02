const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 12;

router.get("/signup", (req, res) => res.render("auth/signup"));

router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (username === "" || email === "" || password === "") {
    res.render("/signup", {
      errorMessage: "Please provide username, email and password.",
    });
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).render("auth/signup", {
      errorMessage: ` <ul>Password need at least:
         <li>Six chars.</li>
        <li>One uppercase letter.</li> 
         <li>One lowecase letter.</li> 
         <li>One number.</li> 
         </ul>`,
    });
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) =>
      User.create({ username, password: hashedPassword })
    )
    .then((userDB) => res.redirect("userProfile",{userDB}))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render("auth/signup", {
          errorMessage: `Email need to be unique. ${email} is already used.`,
        });
      } else {
        console.log(error);
      }
    });
});

router.get("/login", (req, res) => res.render("auth/login"));

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  User.findOne({email}).then((user) => {
    if (user === null) {
      res.render("auth/login", {
        errorMessage: "You are not registered, please sign up!",
      });
      return;
    } else if (bcryptjs.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect('/userProfile')
    } else {
        res.render('auth/login',{errorMessage:'Incorrect password'})
    }
  })
  .catch(error => console.log(error))
});

module.exports = router;
