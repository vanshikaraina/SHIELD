const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes'); // Import auth routes
const session = require('express-session'); 

const path = require("path");
//

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();

// Middlewares
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',  // frontend origin
  credentials: true                 // allow cookies, sessions
}));

app.use(express.json()); // Parse incoming JSON requests
app.use(session({ secret: 'yourSecret', resave: false, saveUninitialized: false,cookie: {
  httpOnly: true,  // prevents client-side access to session cookie
  secure: false,   // Should be true in production with HTTPS
  maxAge: 1000 * 60 * 60 * 24 // Session expiry
} })); // Set up session middleware


const checkAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  next();
};

// Routes
const issueRoutes = require('./routes/issueRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes'); // Add feedback routes
const sensitiveRoutes = require('./routes/sensitiveRoutes');

app.use('/api/protected', checkAuth);

app.use('/api/issues', issueRoutes);
app.use('/api/feedback', feedbackRoutes); // Use feedback routes for /api/feedback
app.use('/api/sensitive', sensitiveRoutes); // Ensure sensitiveRoutes are added
app.use('/api/auth', authRoutes); // Prefix '/api/auth' for authentication routes


// Root route (optional)
app.get('/', (req, res) => {
  res.send('Safe Streets Backend is running!');
});


// Serve React static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


