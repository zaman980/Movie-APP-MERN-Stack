const Movie = require('../Models/MovieModel'); // Adjust based on your directory structure
const cookieParser = require('cookie-parser');
// Create a new Movie
exports.createMovie = async (req, res) => {
 console.log("User Received or not")
  try {
    const { name, type, duration } = req.body;
    const User=req.user;
    console.log("User",User);
    
    if (!name || !type || !duration) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, type, duration) are required"
      });
    }
    console.log("dwwdqad");
    // Create a new movie associated with the logged-in user
    const newMovie = new Movie({
      name,
      type,
      duration,
      user:User._id
       // Assume user info is attached to req.user from the authentication middleware
    });
    console.log(newMovie)

    await newMovie.save();
    const populatedMovie = await Movie.findById(newMovie._id).populate('user');
    console.log("popo",populatedMovie);

    
    return res.status(201).json({
      message: 'Movie created successfully',
      movie: populatedMovie
    });
   
    return res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
  } catch (error) {
    // Handle potential server errors
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get all Movies
exports.getAllMovies = async (req, res) => {
  console.log("123")
  try {
    const userId = req.user._id;

    // Find movies where the 'user' field matches the logged-in user's ID
    const movies = await Movie.find({ user: userId }).populate('user', 'username email');
    if (movies.length === 0) {
      return res.status(404).json({ message: 'No movies found' });
    }
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get Movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('user', 'username email');
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Update Movie by ID
exports.updateMovie = async (req, res) => {
  try {
    const { name, type, duration } = req.body;

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Ensure the movie belongs to the logged-in user
    if (movie.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied: You are not authorized to update this movie' });
    }

    // Update the movie details
    movie.name = name || movie.name;
    movie.type = type || movie.type;
    movie.duration = duration || movie.duration;

    await movie.save();
    return res.status(200).json({ message: 'Movie updated successfully', movie });
  } catch (error) {
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Delete Movie by ID
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Ensure the movie belongs to the logged-in user
    if (movie.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied: You are not authorized to delete this movie' });
    }

    // await movie.remove();
    return res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
};
