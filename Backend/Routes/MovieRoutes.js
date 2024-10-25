const express = require('express');
const router = express.Router();
const {createMovie,getAllMovies,getMovieById,updateMovie,deleteMovie} = require('../Controllers/MovieController.js'); // Movie controller
const AuthUser = require('../Middlewares/AuthUser'); // Auth middleware
const VerifyToken=require('../Middlewares/Verify_Token');
const Movie_Validation=require('../Middlewares/Movie_Validation');
const Verify_Token=require('../Middlewares/Verify_Token')

// Protected routes
router.post('/', AuthUser,Movie_Validation ,createMovie);
router.get('/', AuthUser ,getAllMovies);
router.get('/:id', AuthUser, getMovieById);
router.put('/:id', AuthUser, updateMovie);
router.delete('/:id', AuthUser, deleteMovie);

module.exports = router;
