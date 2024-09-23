const express = require('express');
const axios = require('axios');
const cors = require('cors');  
const admin = require('firebase-admin');
const serviceAccount = require('./firebase_creds.json'); // Replace with the correct path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();

const port = 3001;
app.use(cors());
app.use(express.json());
app.get('/ratings', async (req, res) => {
  try {
    const response = await axios.get('https://clist.by/coder/manojkumar2412/ratings/');
    console.log("ratings- successfully data retrieved");
    res.json(response.data);
  } catch (error) {
    console.log("ratings- Error fetching data: "+error.message );
    res.status(500).send('Error fetching data');
  }
});

app.post('/save_message', async (req, res) => {
  const { email, name, subject, message } = req.body;
  if (!email || !name || !subject || !message) {
    console.log("save_message- All fields are required");
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const docRef = await db.collection('messages').add({
      email,
      name,
      subject,
      message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log("save_message-Message successfully added, doc_id: " + docRef.id);
    res.status(201).json({ message: 'Message successfully added', id: docRef.id });
  } catch (error) {
    console.log("save_message- Error adding message: "+ error.message );
    res.status(500).json({ error: 'Error adding message: ' + error.message });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});