function handleControllerError(res, error, fallbackMessage) {
  if (error && error.name === 'AppError') {
    return res.status(error.status).json({
      success: false,
      message: error.message,
    });
  }

  console.error(fallbackMessage, error);
  return res.status(500).json({
    success: false,
    message: fallbackMessage,
  });
}

module.exports = { handleControllerError };
