// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db, createTable } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize the database table
createTable();

// Routes
app.post('/contact', (req, res) => {
  const { name, email, query } = req.body;
  console.log(`Received query from ${name} (${email}): ${query}`);

  // Insert the form data into the SQLite database
  db.run(
    `INSERT INTO contacts (name, email, query) VALUES (?, ?, ?)`,
    [name, email, query],
    (err) => {
      if (err) {
        console.error('Error inserting data:', err.message);
        res.status(500).send({ message: 'Error saving data to the database' });
      } else {
        res.status(200).send({ message: 'Thank you for your response' });
      }
    }
  );
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
