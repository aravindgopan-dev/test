const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  let customError = {
    status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong. Try again :(",
  };
  if (err.name && err.name === "ValidationError") {
    return res.status(StatusCodes.BAD_REQUEST).json(
      `Please provide valid ${Object.keys(err.errors)
        .join(", ")
        .replace(/,(?=[^,]+$)/g, " and")}`
    );
  }
  if (err.code && err.code === 11000) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      `The values for fields ${Object.keys(err.keyValue)
        .join(", ")
        .replace(
          /,(?=[^,]+$)/g,
          " and"
        )} already exists, please try other values`
    );
  }
  return res
    .status(customError.status)
    .json({ errorMessage: customError.message });
};

module.exports = errorHandler;
