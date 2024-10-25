import React, { useState } from "react";
import "./SignIn.css"; // Assuming CSS is stored here
import axios from "axios";
import { useNavigate } from "react-router-dom"; 


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(""); // To store token in state
  const navigate = useNavigate(); 
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Make the request using await
      const response = await axios.post(
        "http://localhost:4000/user/login",
        { email, password }
      );

      // Set token from response data
      const token = response.data.token;
      setToken(token);

      console.log("Token received:", token);

      if (token) {
        // Store token in localStorage
        localStorage.setItem("token", token);

        // Optional: Store token in cookies (if you prefer)
       

        alert("Sign-in successful!");

        navigate("/movielist");
      } else {
        console.error("Token not found in the response");
      }
    } catch (error) {
      console.error("Error signing in:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className='signin-container'>
      <form className='signin-form' onSubmit={handleSignIn}>
        <h2>Sign in</h2>
        <div className='input-field'>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
        </div>
        <div className='input-field'>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
  }

export default SignIn;
