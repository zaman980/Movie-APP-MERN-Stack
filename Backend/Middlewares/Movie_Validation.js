const Joi = require('joi');

// Define the Movie validation schema
const movieValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().trim().messages({
    'string.base': 'Name should be a type of text',
    'string.empty': 'Name cannot be an empty field',
    'string.min': 'Name should have at least 3 characters',
    'any.required': 'Name is a required field'
  }),
  type: Joi.string().min(3).max(50).required().trim().messages({
    'string.base': 'Type should be a type of text',
    'string.empty': 'Type cannot be an empty field',
    'string.min': 'Type should have at least 3 characters',
    'any.required': 'Type is a required field'
  }),
  duration: Joi.number().integer().min(1).required().messages({
    'number.base': 'Duration must be a number',
    'number.min': 'Duration must be at least 1 minute',
    'any.required': 'Duration is a required field'
  }),
  
  })
;

// Middleware to validate Movie data
const validateMovie = (req, res, next) => {
  const { error } = movieValidationSchema.validate(req.body, { abortEarly: false }); // Validate the request body
  console.log("Movie Validation");

  if (error) {
    console.log("Error")
    // Send back a 400 error with the validation messages
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ errors: errorMessages });
  }

  next(); // Proceed if no validation errors
};

module.exports = validateMovie;
