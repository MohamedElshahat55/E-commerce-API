const apiError = require("../utils/ApiError");

const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorForProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

const handleJwtInvalidSignature = () =>
  new apiError("Invalid token, please login again..", 401);

const handleJwtExpired = () =>
  new apiError("Expired token, please login again..", 401);

const globalMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.satus = err.satus || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") err = handleJwtInvalidSignature();
    if (err.name === "TokenExpiredError") err = handleJwtExpired();
    sendErrorForProd(err, res);
  }
};

module.exports = globalMiddleware;
