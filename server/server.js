const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const isDevelopmentBuild = (process.env.NODE_ENV === 'development');

(isDevelopmentBuild) ? dotenv.config({ path: '..env.local' }) : dotenv.config({ path: '.env' });

const app = express();
const PORT = process.env.PORT;
const COLLECTION_PATH = process.env.COLLECTION_PATH;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// CORS Config
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
}));

const admin = require('firebase-admin');
const {cert} = require("firebase-admin/app");

// Initialize Firebase Admin SDK with service account credentials
admin.initializeApp({
  credential: (isDevelopmentBuild) ?
      admin.credential.applicationDefault() :
      cert("./service-account-key/test-service-account-key.json"),
});

// DB configuration
const db = admin.firestore();
if (isDevelopmentBuild) {
  db.settings({
    host: 'localhost:8000',
    ssl: false,
  });
}

// submission handler
app.post('/submit', async (req, res) => {
  try {
    const formData = req.body;
    console.log('Form Data Received:', formData);
    await db.collection(COLLECTION_PATH).doc().set(formData);
    res.status(200).json({ message: 'Form submission successful!' });
  } catch (error) {
    console.error('Error writing document:', error);
    res.status(500).json({ message: 'Error saving form data', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Running application in ${process.env.NODE_ENV} mode.`);
  console.log(`Server running at http://localhost:${PORT}`);
});

