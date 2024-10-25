const express = require('express');
const router = express.Router();
const {GreetingUser,registerUser,loginUser,getUserProfile,updateUser,deleteUser} = require('../controllers/UserController'); // User Controller
const AuthUser = require('../middlewares/AuthUser'); 
const verifyToken=require('../Middlewares/Verify_Token');// Middleware for authentication
const User_Validation= require('../Middlewares/User_Validation');

router.get('/Hello',GreetingUser);
// User registration route
router.post('/register',User_Validation, registerUser);

// User login route (returns a JWT token)
router.post('/login',loginUser);

// Get logged-in user profile (Protected route)
router.get('/profile', [verifyToken,AuthUser] ,getUserProfile);

router.put('/update', [verifyToken,AuthUser, User_Validation],updateUser);

// Delete the logged-in user
router.delete('/delete',[verifyToken,AuthUser], deleteUser);
module.exports = router;
