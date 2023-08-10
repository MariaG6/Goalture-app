const router = require("express").Router(); // Require express to create routes
const mongoose = require("mongoose"); // Handle MONDODB
const Goal = require("../models/Goal.model"); // goalSchema connected to MONGODB

// Create a route for the Create Goal
// Create a route to see all the goals page.

// GET route to display the "Create Goal" form
router.get("/createGoal", (req, res) => {
  res.render("goals/createGoal"); // Render the createGoal.hbs view
});

router.post("/createGoal", async (req, res) => {
  const { user, title, category, reason, isPublic, isPrivate } = req.body;

  try {
    // Create a new goal in the database
    await Goal.create({
      user,
      title,
      category,
      reason,
      isPublic,
      isPrivate,
      steps,
    });
    res.redirect("my-goals"); // Redirect to the "My Goals" page after the goal is created
  } catch (error) {
    console.log(error);
    res.render("createGoal", {
      errorMessage: "Failed to create goal. Please try again.",
    });
  }
});

// GET route to display the "My Goals" page
router.get("/", async (req, res) => {
  console.log("Accesed");
  try {
    // Retrieve the user's goals from the database
    const userGoals = await Goal.find({ user: req.session.currentUser._id });
    res.render("goals/myGoals", { goals: userGoals }); // Render the myGoals.hbs view and pass the user's goals as data
  } catch (error) {
    console.log(error);
    res.render("goals/myGoals", {
      errorMessage: "Failed to fetch goals. Please try again.",
    });
  }
});

//Route for the goalDetails page, for a specific goal.
router.get("/goal/:goalId", (req, res) => {
  Goal.findById(req.params.goalId)
    .then((goal) => {
      if (!goal) {
        return res.render("error", { errorMessage: "Goal not found." });
      }
      res.render("goalDetails", { goal });
    })
    .catch((error) => {
      console.log(error, "Failed to view goal details.");
    });
});

module.exports = router;
