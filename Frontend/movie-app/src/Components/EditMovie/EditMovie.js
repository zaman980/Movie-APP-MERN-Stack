import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EditMovie.css';

function EditMovie() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [movieId, setMovieId] = useState(''); // Hardcoded movie ID for now
    const { id } = useParams(); 

    // Get token from local storage
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    // Function to fetch the current movie data by ID
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/Movie/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include JWT token in header
                    },
                });
                const movie = response.data;
                setName(movie.name);
                setType(movie.type);
                setDuration(movie.duration);
            } catch (error) {
                console.error('Error fetching movie:', error.response?.data || error.message);
            }
        };

        fetchMovie();
    }, [id, token]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare movie data to update
        const updatedMovie = {
            name,
            type,
            duration: parseInt(duration, 10), // Convert duration to a number
        };

        try {
            // Send a PUT request to the API with the token in the Authorization header
            const response = await axios.put(`http://localhost:4000/api/Movie/${id}`, updatedMovie, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include JWT token in header
                },
            });

            console.log('Movie updated:', response.data);
            // Add success handling, such as redirecting or showing a success message
        } catch (error) {
            console.error('Error updating movie:', error.response?.data || error.message);
            // Add error handling, such as showing an error message
        }
    };

    return (
      <div className="upload-container">
      <div className="image-upload">
        {/* <input type="file" onChange={handleImageChange} /> */}
       
          <div className="placeholder">
            <span>Drop or drag image here</span>
          </div>
        
      </div>
      <div className="form-fields">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <div className="buttons">
          <button type="button" className="cancel-button">Cancel</button>
          <button type="submit" className="submit-button" onClick={handleSubmit}>Update</button>
        </div>
      </div>
    </div>
    );
}

export default EditMovie;
