const router = require("express").Router(); // Require express to create routes
const mongoose = require("mongoose"); // Handle MONDODB
const Goal = require("../models/Goal.model"); // goalSchema connected to MONGODB
const { isLoggedIn, isLoggedOut } = require("../middleware/route.guard"); // Require auth middleware to protect routes

// Create a route for the Create Goal
// Create a route to see all the goals page.

// GET route to display the "Create Goal" form
router.get("/createGoal", isLoggedIn, (req, res) => {
  res.render("goals/createGoal"); // Render the createGoal.hbs view
});

// POST route to process the goal data to create
router.post("/createGoal", async (req, res) => {
  const {
    user,
    title,
    category,
    reason,
    isPublic,
    isPrivate,
    step,
    step1,
    step2,
  } = req.body;
  // Validation to have 3 steps
  if (step === "" || step1 === "" || step2 === "") {
    res.render("goals/createGoal", {
      errorMessage: " Goal must contain at least 3 steps",
    });
    return;
  }
  // Create a new goal in the database
  try {
    await Goal.create({
      user: req.session.currentUser._id,
      title,
      category,
      reason,
      isPublic,
      isPrivate,
      steps: [{ step }, { step: step1 }, { step: step2 }],
    });
    res.redirect("/my-goals"); // Redirect to the "My Goals" page after the goal is created
  } catch (error) {
    console.log(error);
    res.render("goals/myGoals", {
      errorMessage: "Failed to create goal. Please try again.",
    });
  }
});

// GET route to display the "My Goals" page
router.get("/", isLoggedIn, async (req, res) => {
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

// Route for the goalDetails page, for a specific goal.
router.get("/goal/:goalId", isLoggedIn, (req, res) => {
  Goal.findById(req.params.goalId)
    .then((goal) => {
      if (!goal) {
        return res.render("error", { errorMessage: "Goal not found." });
      }
      res.render("goals/goalDetails", { goal });
    })
    .catch((error) => {
      console.log(error, "Failed to view goal details.");
    });
});

// Route for editing a goal
router.post("/goal/:goalId", (req, res) => {
  console.log(req.body);
  const {
    title,
    category,
    reason,
    editedSteps0,
    editedSteps1,
    editedSteps2,
    editedStepsIsCompleted0,
    editedStepsIsCompleted1,
    editedStepsIsCompleted2,
  } = req.body;

  const newSteps = [
    { step: editedSteps0, isCompleted: editedStepsIsCompleted0 ? true : false },
    { step: editedSteps1, isCompleted: editedStepsIsCompleted1 ? true : false },
    { step: editedSteps2, isCompleted: editedStepsIsCompleted2 ? true : false },
  ];
  Goal.findByIdAndUpdate(req.params.goalId, {
    title,
    category,
    reason,
    steps: newSteps,
  })
    .then((goal) => {
      res.redirect("/my-goals");
    })
    .catch((error) => {
      console.log(error, "Failed to view goal details.");
    });
});

// Route for deleting a goal
router.post("/deleteGoal/:goalId", (req, res) => {
  Goal.findByIdAndDelete(req.params.goalId)
    .then(() => {
      res.redirect("/my-goals");
    })
    .catch((error) => {
      console.log(error, "Failed to delete goal.");
      res.redirect("/my-goals"); // Redirect back to the goals list on error
    });
});

module.exports = router;
