const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel'); // Adjust based on your directory structure
require('dotenv').config(); // Load environment variables



exports.GreetingUser=async (req,res)=>
{
  return res.json({message:"Hello User!!!"});
}
// User Registration
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // console.log(username,password,email);
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
   
console.log(newUser);
    // Save the new user
    await newUser.save();

  

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', details: error.message });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id, username: user.username, email: user.email }, process.env.SECRET_KEY, { expiresIn: '4d' });
    res.cookie('token', token, {
      httpOnly: true, // Make sure this is true for security (not accessible from JavaScript)
      // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict', // Strict policy for SameSite cookies
  }); // Set cookie with token
    // res.send('Login successful');

    // Return the token
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', details: error.message });
  }
};

// Get Logged-in User Profile
exports.getUserProfile = async (req, res) => {
  try {
    // req.user is populated by the AuthUser middleware
    const user = await User.findById(req.user._id).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', details: error.message });
  }
};
exports.updateUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Get the authenticated user's ID from the token (handled by AuthUser middleware)
      const userId = req.user._id;
  
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user details (if provided)
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) {
        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
  
      // Save updated user
      await user.save();
  
      return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', details: error.message });
    }
  };
  
  // Delete User
  exports.deleteUser = async (req, res) => {
    try {
      // Get the authenticated user's ID from the token (handled by AuthUser middleware)
      const userId = req.user._id;
  
      // Find and delete the user by ID
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', details: error.message });
    }
  };