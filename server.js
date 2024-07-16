const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose(); // Correct usage
const { open } = require('sqlite'); // This should be installed via `sqlite` package

const app = express();
const PORT = 5500;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
let db;

(async () => {
  db = await open({
    filename: './database.db',
    driver: sqlite3.Database // Use sqlite3.Database
  });

  // Create users table if it doesn't exist
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      password TEXT
    )
  `);
})();

// Routes
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await db.run(`
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
    `, [username, email, password]);

    console.log('User registered:', { username, email });
    res.redirect('/index2.html'); // Redirect to index2.html upon successful registration
  } catch (err) {
    console.error('Registration error:', err.message);
    res.send('Username or email already taken');
  }
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  console.log(`Login attempt with username: ${username} and password: ${password}`);

  const user = await db.get(`
    SELECT * FROM users WHERE username = ? AND password = ?
  `, [username, password]);

  if (user) {
    res.redirect('/index2.html'); // Redirect to the desired page upon successful login
  } else {
    res.status(401).json({ error: 'Invalid username or password' }); // Send JSON response on failure
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
