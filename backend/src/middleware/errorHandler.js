export function errorHandler(error, req, res, next) {
  console.error(error);
  const status = error.status || 500;

  res.status(status).json({
    message:
      status === 503
        ? "Movie service is not configured or temporarily unavailable."
        : "Something went wrong while processing your request.",
    details: process.env.NODE_ENV === "development" ? error.message : undefined
  });
}
