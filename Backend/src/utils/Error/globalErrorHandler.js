export const globalErrorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something broke ⛓️‍💥";
  let errors = [];

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(error.errors).map((err) => err.message);
  }

  if (error.name === "ZodError") {
    statusCode = 400;
    message = "Invalid request data";
    errors = error.errors.map((err) => `${err.path.join(".")} ${err.message}`);
  }

  if (error.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${error.path}: ${error.value}`;
  }

  if (error.code && error.code === 11000) {
    statusCode = 409; 
    message = `Duplicate field value: ${JSON.stringify(error.keyValue)}`;
  }

  if (error.name === "UnauthorizedError" || error.statusCode === 401) {
    statusCode = 401;
    message = "Unauthorized: Invalid or missing token";
  }
  if (error.statusCode === 403) {
    statusCode = 403;
    message = "Forbidden: Access denied";
  }

  if (error.statusCode === 404) {
    statusCode = 404;
    message = error.message || "Resource not found";
  }

  if (error.isCustomAppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: errors.length > 0 ? errors : undefined,
  });
};
