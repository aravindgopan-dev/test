const statusCodes = require('http-status-codes').StatusCodes;
const notFound = (req, res) => res.status(statusCodes.NOT_FOUND).send(`Error ${statusCodes.NOT_FOUND}. Not found :(`);

module.exports = notFound;