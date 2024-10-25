const express = require('express');
const connectDB = require('./Config/db');
const MovieRoutes = require('./Routes/MovieRoutes');
const UserRoutes= require('./Routes/UserRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
// Alternatively, specify the origin (useful for production)
// app.use(cors({
//   origin: 'http://localhost:3000' ,
//   credentials: true,  // replace with your React app's URL
// }));

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your front-end address
  credentials: true,
  // Specify allowed headers
}));


// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
    console.error(err.stack);  // Logs the error stack trace
    res.status(500).json({ message: 'An error occurred', error: err.message });
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    // res.header("Access-Control-Allow-Credentials", "true");
    // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    // res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  });
 
  
// Routes
app.use('/api/Movie', MovieRoutes);
app.use('/user',UserRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
