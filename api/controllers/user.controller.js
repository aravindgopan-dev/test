// Package imports
const mongoose = require("mongoose");
const StatusCodes = require("http-status-codes").StatusCodes;

// Local imports
const { BadRequestError, UnauthenticatedError } = require("../errors/index.js");
const User = require("../models/User.js");

// Middlewares functions

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email)
    throw new BadRequestError(
      "Please provide a valid username, email and password"
    );
  const user = await User.create({ username, email, password });
  res
    .status(StatusCodes.CREATED)
    .json({ message: `user '${user.username}' created successfully` });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    throw new BadRequestError("Please provide a username and a password");
  const user = await User.findOne({ username });
  const isValidPassword = user && (await user.comparePassword(password));
  if (!user || !isValidPassword) {
    res.cookie("Authorization", "", { expires: new Date(Date.now()) });
    throw new UnauthenticatedError("Invalid credentials!");
  }
  const token = user.createJwt();
  res.cookie("Authorization", `Bearer ${token}`, {
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * process.env.JWT_EXPIRY
    ),
  });
  res.status(StatusCodes.OK).json({
    user: { username: user.username, message: "logged in successfully" },
  });
};

const logout = async (req, res) => {
  res.clearCookie("Authorization");
};

module.exports = { register, login };
