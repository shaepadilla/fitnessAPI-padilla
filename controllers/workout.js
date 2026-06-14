const Workout = require("../models/Workout");

// Add a new workout for a user
module.exports.addWorkout = (req, res) => {
	const { name, duration, userId } = req.body;

	if (!name || !duration || !userId) {
		return res.status(400).send({ message: "name, duration and userId are required" });
	}

	const newWorkout = new Workout({
		userId,
		name,
		duration
	});

	return newWorkout.save()
		.then((workout) => res.status(201).send(workout))
		.catch((err) => res.status(500).send({ error: "Failed to save workout", details: err.message }));
};

// Retrieve only the logged-in user's workouts
module.exports.getMyWorkouts = (req, res) => {
	return Workout.find({ userId: req.user.id })
		.then((workouts) => res.status(200).send({ workouts }))
		.catch((err) => res.status(500).send({ error: "Failed to fetch workouts", details: err.message }));
};
