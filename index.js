const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user");
const workoutRoutes = require("./routes/workout");
const { errorHandler } = require("./auth");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas"));

// Routes
app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

// Global error handler
app.use(errorHandler);

// Start the server
if (require.main === module) {
	app.listen(process.env.PORT || 4000, () => {
		console.log(`API is now online on port ${process.env.PORT || 4000}`);
	});
}

module.exports = { app, mongoose };
