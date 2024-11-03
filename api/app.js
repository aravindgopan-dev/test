const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const cookieParser = require("cookie-parser");
const expressSanitizer = require("express-sanitizer");
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const storyRoutes = require("./routes/story.routes");
const userRoutes = require("./routes/user.routes");
const authorizeMiddleware = require("./middleware/authorize");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDb = require("./db/connectDb");

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/stories", /*authorizeMiddleware,*/ storyRoutes);
app.use("/api/v1/user", userRoutes);

app.use("*", (req, res) => res.send("Not Found"));
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const run = async () => {
  try {
    console.log("works mongo");
    await connectDb(process.env.MONGO_URI);
    console.log("works mongo1");
    app.listen(port, () => {
      console.log(`The server is listening on port ${port}`);
    });
  } catch (err) {
    console.log("failed to connect to the database...", err);
  }
};

run();
