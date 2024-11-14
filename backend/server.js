const express = require('express');
require('dotenv').config();  // Load environment variables
const path = require('path');
const cors = require('cors');

// Firebase Admin initialization (if needed)
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Sample route for /api/titles
app.get('/api/titles', async (req, res) => {
  try {
    const rdb = admin.database();
    const ref = rdb.ref('titles');
    ref.once('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send('No data found');
      }
    });
  } catch (error) {
    res.status(500).send('Error retrieving data');
  }
});

// Route for saving messages
app.post('/api/save_message', async (req, res) => {
  const { email, name, subject, message } = req.body;
  if (!email || !name || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const db = admin.firestore();
    const docRef = await db.collection('messages').add({
      email,
      name,
      subject,
      message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ message: 'Message successfully added', id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Error adding message: ' + error.message });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve the React app from the "build" directory
  app.use(express.static(path.join(__dirname, 'build')));

  // Catch-all route to serve React's index.html for any unknown paths
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
