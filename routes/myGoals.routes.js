
const Goal = require("../models/Goal.model");

// Create a route for the Create Goal 
// Create a route to see all the goals page. 

const express = require("express");
const router = express.Router();

// GET route to display the "Create my Goal" page
router.get("/create-goal", (req, res) => {
  res.render("createGoal"); // Render the createGoal.hbs view
});

// POST route to handle goal creation form submission
router.post("/create-goal", (req, res) => {
  // Process the data submitted in the form
  // Save the goal to the database and link it to the current user
  // Redirect to the "My Goals" page after successful goal creation
  // Handle any errors that may occur during goal creation
});




// GET route to display the "My Goals" page
router.get("/my-goals", (req, res) => {
  // Retrieve the user's goals from the database
  // Render the myGoals.hbs view and pass the user's goals as data
});

module.exports = router;