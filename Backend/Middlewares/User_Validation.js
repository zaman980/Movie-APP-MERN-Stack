const ValidateUser = (req, res, next) => {
    const { username, password,email } = req.body;
  
    // Check if username and password are provided
    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    // Validate username (optional: add your custom username validation)
    if (typeof username !== 'string' || username.trim().length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }
  
    // Validate password (optional: add custom password rules)
    if (typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
  
    console.log(username,password,email)
    // If validation passes, proceed to the next middleware or controller
    next();
  };
  
  module.exports = ValidateUser;
  