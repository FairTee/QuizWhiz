// Import the express module
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();

// Define the port the server will listen on
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('<h1>Welcome to QuizWhiz!</h1>');
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
