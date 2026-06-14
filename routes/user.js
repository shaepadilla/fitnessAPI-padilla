const express = require("express");
const userController = require("../controllers/user");
const { verify } = require("../auth");

const router = express.Router();

// Register
router.post("/register", userController.registerUser);

// Login
router.post("/login", userController.loginUser);

// Retrieve user details (requires authentication)
router.get("/details", verify, userController.getProfile);

module.exports = router;
