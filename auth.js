const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET_KEY || "FitnessAPISecretKey";

// Create a JSON web token containing the user's data
module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};

	return jwt.sign(data, secret, {});
};

// Verify the token sent in the Authorization header
module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	if (typeof token === "undefined") {
		return res.status(401).send({ auth: "Failed", message: "No token provided" });
	}

	token = token.slice(7, token.length);

	jwt.verify(token, secret, function (err, decodedToken) {
		if (err) {
			return res.status(403).send({
				auth: "Failed",
				message: err.message
			});
		}

		req.user = decodedToken;
		next();
	});
};

// Standard error handler middleware
module.exports.errorHandler = (err, req, res, next) => {
	console.error(err);

	const statusCode = err.status || 500;
	const errorMessage = err.message || "Internal Server Error";

	res.status(statusCode).send({
		error: {
			message: errorMessage,
			errorCode: err.code || "SERVER_ERROR"
		}
	});
};
