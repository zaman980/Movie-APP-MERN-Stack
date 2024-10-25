const jwt = require("jsonwebtoken");
require("dotenv").config(); // Replace with your actual secret key

const verifyToken = (req, res, next) => {

  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ error: 'Authorization header missing or malformed' });
  }
  
  const token = authHeader.replace('Bearer ', '').trim();

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Check if the header is properly formatted as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "Malformed token." });
  }

  try {
    // Verify token
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    console.log("token" + verified);
    req.user = verified.replace('Bearer ', '').trim(); 
    console.log("new",user)// Store the verified user info in the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
