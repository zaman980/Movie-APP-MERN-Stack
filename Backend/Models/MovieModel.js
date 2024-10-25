const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the Movie Schema
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // To remove any extra spaces from the name
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number, // Assuming duration is in minutes
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true, // Make sure a movie must have an associated user
  },
}, { timestamps: true }); // Add createdAt and updatedAt fields automatically

// Create the Movie Model
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
