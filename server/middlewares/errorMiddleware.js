const errorMiddleware = (err, req, res, next) => {
  console.error("Error Middleware:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
};

module.exports = errorMiddleware;
