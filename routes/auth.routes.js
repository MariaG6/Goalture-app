const router = require("express").Router(); // Require express to create routes
const mongoose = require("mongoose"); // Handle MONDODB
const bcryptjs = require("bcryptjs"); // Package to encryp user password

const User = require("../models/User.model"); // userSchema connected to MONGODB
const saltRounds = 12; // Times bcrypt run the salt

// GET route display the signup form to users
router.get("/signup", (req, res) => res.render("auth/signup"));

// POST route to process the user data to signup
router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  // Validation to have all the data
  if (username === "" || email === "" || password === "") {
    res.render("/signup", {
      errorMessage: "Please provide username, email and password.",
    });
  }
  // To have a strong password
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    // Check if it matches and if not send an error
    res.status(500).render("auth/signup", {
      errorMessage: `Password need at least:
        ·Six chars.
        ·One uppercase letter.
        ·One lowecase letter.
        ·One number.`,
    });
  }
  // To encrypt the password
  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then(
      (hashedPassword) => User.create({ username, password: hashedPassword }) // ! Create a user
    )
    .then((userDB) => res.redirect("userProfile", { userDB })) // <-- Send the user to userprofile with userdata
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message }); // Send an error if the email its not valid
      } else if (error.code === 11000) {
        res.status(500).render("auth/signup", {
          errorMessage: `Email need to be unique. ${email} is already used.`,
        });
      } else {
        console.log(error);
      }
    });
});

// GET route display the login form to users
router.get("/login", (req, res) => res.render("auth/login"));

// POST route to process the user data to login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validation to have all the data
  if (email === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      // Check if there's user with the provided email
      if (user === null) {
        res.render("auth/login", {
          errorMessage: "You are not registered, please sign up!",
        });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        // Check if the password is correct
        req.session.currentUser = user; // Save the session info into user variable
        res.redirect("/userProfile", { user }); // <-- Send the user to userprofile with userdata
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password" });
      }
    })
    .catch((error) => console.log(error));
});

module.exports = router;
