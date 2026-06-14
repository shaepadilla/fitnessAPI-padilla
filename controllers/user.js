const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../auth");

// Register a new user with only email and password
module.exports.registerUser = (req, res) => {
	const { email, password } = req.body;

	if (!email || !email.includes("@")) {
		return res.status(400).send({ message: "Invalid email format" });
	}

	if (!password || password.length < 8) {
		return res.status(400).send({ message: "Password must be at least 8 characters" });
	}

	return User.findOne({ email })
		.then((existingUser) => {
			if (existingUser) {
				return res.status(409).send({ message: "Email already in use" });
			}

			const newUser = new User({
				email,
				password: bcrypt.hashSync(password, 10)
			});

			return newUser.save()
				.then(() => res.status(201).send({ message: "Registered Successfully" }))
				.catch((err) => res.status(500).send({ error: "Failed to register", details: err.message }));
		})
		.catch((err) => res.status(500).send({ error: "Error finding user", details: err.message }));
};

// Login an existing user and return an access token
module.exports.loginUser = (req, res) => {
	const { email, password } = req.body;

	if (!email || !email.includes("@")) {
		return res.status(400).send({ message: "Invalid email format" });
	}

	return User.findOne({ email })
		.then((user) => {
			if (user === null) {
				return res.status(404).send({ message: "No user found" });
			}

			const isPasswordCorrect = bcrypt.compareSync(password, user.password);

			if (isPasswordCorrect) {
				return res.status(200).send({ access: auth.createAccessToken(user) });
			}

			return res.status(401).send({ message: "Incorrect email or password" });
		})
		.catch((err) => res.status(500).send({ error: "Error during login", details: err.message }));
};

// Retrieve the logged-in user's details
module.exports.getProfile = (req, res) => {
	return User.findById(req.user.id)
		.select("-password")
		.then((user) => {
			if (user === null) {
				return res.status(404).send({ message: "User not found" });
			}

			return res.status(200).send({ user });
		})
		.catch((err) => res.status(500).send({ error: "Failed to fetch profile", details: err.message }));
};
