const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal.model");

// Create a route for the Create Goal
// Create a route to see all the goals page.
// GET route to display the "Create my Goal" page
router.get("/create-goal", (req, res) => {
  res.render("createGoal"); // Render the createGoal.hbs view
});


router.post("/create-goal", async (req, res) => {
    const { user, title, category, reason, isPublic, isPrivate } = req.body;
    
    try {
      // Create a new goal in the database
      await Goal.create({ user, title, category, reason, isPublic, isPrivate, steps });
      res.redirect("/my-goals"); // Redirect to the "My Goals" page after the goal is created
    } catch (error) {
      console.log(error);
      res.render("createGoal", { errorMessage: "Failed to create goal. Please try again." });
    }
  });
  
  // GET route to display the "My Goals" page
  router.get("/my-goals", async (req, res) => {
    try {
      // Retrieve the user's goals from the database
      const userGoals = await Goal.find({ user: req.session.currentUser._id });
      res.render("myGoals", { goals: userGoals }); // Render the myGoals.hbs view and pass the user's goals as data
    } catch (error) {
      console.log(error);
      res.render("myGoals", { errorMessage: "Failed to fetch goals. Please try again." });
    }
  });
  
  module.exports = router;
  
  
  
  
  