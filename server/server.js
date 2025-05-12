// server/server.js
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

(process.env.NODE_ENV === 'development')  ? dotenv.config({ path: '.env.local' }) : dotenv.config();

const app = express();
const port = 5175;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
// Todo: CORS

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with service account credentials
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

// Route to handle form submission
app.post('/api/submit', (req, res) => {
  const formData = req.body;
  console.log('Form Data Received:', formData);
  res.status(200).json({ message: 'Form submission successful!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

