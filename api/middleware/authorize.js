// Package imports
const jwt = require("jsonwebtoken");

// Local imports
const { UnauthenticatedError } = require("../errors/index.js");

const authorize = (req, res, next) => {
  console.log(req.cookies);
  console.log(req.cookies);
  const authCookie = req.cookies.Authorization;
  if (!authCookie || !authCookie.startsWith("Bearer "))
    throw new UnauthenticatedError(
      "You do not athorized to access this resource!"
    );
  const token = authCookie.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, username: payload.username };
    next();
  } catch (err) {
    res.cookie("Authorization", "", { expires: new Date(Date.now()) });
    throw new UnauthenticatedError(
      "You do not athorized to access this resource!"
    );
  }
};

module.exports = authorize;
