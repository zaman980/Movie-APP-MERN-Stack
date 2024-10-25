const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel'); // Adjust based on your directory structure
require('dotenv').config(); // Load environment variables

// Middleware to authenticate user
const AuthUser = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ error: 'Authorization header missing or malformed' });
    }
    
    const token = authHeader.replace('Bearer ', '').trim();

    console.log("Token123",token);

    // If no token is provided, respond with a 401 status
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user associated with the token
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    // Attach the user to the request object for further processing
    req.user = user;
    
    
    // Proceed to the next middleware or controller
    next();
  } catch (err) {
    // Handle token errors (e.g., expired or invalid token)
    res.status(400).json({ message: 'Invalid token.', details: err.message });
  }
};

module.exports = AuthUser;
