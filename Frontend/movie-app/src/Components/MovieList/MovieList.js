import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useNavigate} from 'react-router-dom'; 
import './MovieList.css'; // Import the CSS file


function MovieList() {
  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState(''); // Store JWT token
  const navigate = useNavigate();
 

  // Predefined image URLs for movies
  // const movieImages = {
  //   "The Dark Knight": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
  //   "The Power of Dog": "https://image.tmdb.org/t/p/original/vc9uIACEHipYIxU1PE4a5F9tVIP.jpg",
  //   "Titanic":"https://m.media-amazon.com/images/I/71uoicxpqoS._AC_UF1000,1000_QL80_.jpg",
  //   // Add more movies and their corresponding image URLs here
  // };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchMovies(storedToken); // Pass the token to fetchMovies
    } else {
      console.error('No token found.');
    }
  }, []);

  const fetchMovies = async (authToken) => {
    try {
      const response = await axios.get('http://localhost:4000/api/Movie', {
        headers: { Authorization: `Bearer ${authToken}` }, // Add 'Bearer' prefix
      });
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setToken(''); // Clear token state
    navigate('/signin'); // Redirect to login page or any other desired page
  };
 


  return (
    <div className="container">
      <header className="header">
        <h1>My Movies</h1>
        <Link to="/createmovie" className="add-movie-button">+</Link> 
        <div className="user-options">
          <span className="settings-icon">⚙️</span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      {movies.length === 0 ? (
        <p>No movies added yet.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie._id} className="movie-card">
              <img 
               src={movie.poster.startsWith('http') ? movie.poster : `http://localhost:4000/uploads/${movie.poster}`} // Conditionally use full URL or construct the local path
               alt={`${movie.name} poster`} 
               className="movie-image" 
              />
              <div className="movie-info">
                <h2>{movie.name}</h2>
                <p>{movie.type}</p>
                <p>{movie.duration}</p>
                
                  <Link to={`/editmovie/${movie._id}`} className="Edit-button">
                  Edit
               </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;
