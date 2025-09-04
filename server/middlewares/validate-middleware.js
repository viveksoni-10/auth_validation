
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // validate input
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.errors?.[0]?.message || err.issues?.[0]?.message || "Validation error"
    });
  }
};

module.exports = validate;





