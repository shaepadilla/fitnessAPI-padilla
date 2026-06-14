const express = require("express");
const workoutController = require("../controllers/workout");
const { verify } = require("../auth");

const router = express.Router();

// Add a workout
router.post("/addWorkout", verify, workoutController.addWorkout);

// Retrieve the logged-in user's workouts
router.get("/getMyWorkouts", verify, workoutController.getMyWorkouts);

module.exports = router;
