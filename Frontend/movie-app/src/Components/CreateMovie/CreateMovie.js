import React, { useState } from 'react';
import axios from 'axios';
import './CreateMovie.css';


function CreateMovie() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [poster, setSelectedposter] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedposter(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !type || !duration ) {
      alert('Please fill out all fields and select a file.');
      return;
    }

    try {
      setUploadStatus('Uploading poster...');

      // Step 1: Upload the poster image to get its URL
      const posterFormData = new FormData();
      posterFormData.append('poster', poster); // Add the selected file as 'poster'

      // Fetch token from localStorage
     
      const token = localStorage.getItem('token');
      console.log("Token Received",token)
      if (!token) {
        alert('Token not found. Please log in.');
        return;
      }
      
      
      const posterResponse = await axios.post(
        'http://localhost:4000/upload', // Adjust to your upload endpoint
        posterFormData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const posterUrl = posterResponse.data.filePath;

      // Get the URL of the uploaded poster
     
      
      
      // poster=posterFilename;
      console.log("Poster Name",posterUrl);// Adjust based on your API response

    
      const movieFormData = {
        name: name,
        type: type,
        duration: duration,
        poster: posterUrl // Use the URL of the uploaded poster
    };

      setUploadStatus('Creating movie...');

      const movieResponse = await axios.post(
        'http://localhost:4000/api/Movie',
        movieFormData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,// Make sure this line is included
            'Content-Type': 'application/json',
          },
        }
      );

      // Successful movie creation
      setUploadStatus(`Movie created successfully: ${movieResponse.data.movie.name}`); // Adjust based on your API response
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        setUploadStatus(`Error: ${error.response.data.message}`);
      } else {
        console.error('Error:', error.message);
        setUploadStatus('Error creating movie. Please try again.');
      }
    }
  };

  return (
    <div className="upload-container">
      <div className="image-upload">
        <input type="file"  name="poster" onChange={handleFileChange} />
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
          <button type="button" className="cancel-button">
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
    </div>
  );
}

export default CreateMovie;
