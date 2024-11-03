const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");  // Add CORS package
const cookieParser = require("cookie-parser");
const expressSanitizer = require("express-sanitizer");
require("express-async-errors");

const mongoose = require("mongoose");

const app = express();
const storyRoutes = require("./routes/story.routes");
const userRoutes = require("./routes/user.routes");
const authorizeMiddleware = require("./middleware/authorize");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDb = require("./db/connectDb");

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS setup to allow frontend requests
app.use(cors({
  origin: "https://test-68wb.onrender.com",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true  // Allow credentials like cookies if needed
}));

// Routes
app.use("/api/v1/stories", /*authorizeMiddleware,*/ storyRoutes);
app.use("/api/v1/user", userRoutes);

// Catch-all route for undefined endpoints
app.use("*", (req, res) => res.status(404).send("Not Found"));

// Error handling middleware
app.use(errorHandlerMiddleware);

// Database and server start
const run = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDb(process.env.MONGO_URI);
    console.log("MongoDB connection successful");

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.log("Failed to connect to the database...", err);
  }
};

run();
