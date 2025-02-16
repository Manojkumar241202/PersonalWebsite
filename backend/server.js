const express = require('express');
require('dotenv').config();
const path = require('path');
const axios = require('axios');
const cors = require('cors');  
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle newline characters
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const CODING_PLATFORMS = Object.freeze({
  CODECHEF: 'codechef.com',
  CODEFORCES: 'codeforces.com',
  ATCODER: 'atcoder.jp',
  LEETCODE: 'leetcode.com'
});

const db = admin.firestore();
const app = express();
const rdb = admin.database();
const port = process.env.PORT || 3001;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.FROM_EMAIL_USER,
    pass: process.env.FROM_EMAIL_PASS 
  }
});

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, './build')));


// Define a route to retrieve data from Realtime Database
app.get('/api/titles', async (req, res) => {
  console.log('Incoming request to /titles');

  try {
    const ref = rdb.ref('titles'); 
    console.log('Attempting to retrieve data from node: titles');

    ref.once('value', (snapshot) => {
      const data = snapshot.val();

      if (data) {
        console.log('Data retrieved successfully');
        res.status(200).json(data);
      } else {
        console.log('No data found at the specified node.');
        res.status(404).send('No data found');
      }
    }, (errorObject) => {
      console.error('Error while accessing Firebase Realtime Database:', errorObject);
      res.status(500).send('Error retrieving data');
    });

  } catch (error) {
    console.error('Unexpected error while processing request:', error);
    res.status(500).send('Unexpected error occurred');
  }
});

app.get('/api/resume', async (req, res) => {
  console.log('Incoming request to /resume');

  try {
    const ref = rdb.ref('resumeURL'); 
    console.log('Attempting to retrieve data from node: resumeURL');

    ref.once('value', (snapshot) => {
      const data = snapshot.val();

      if (data) {
        console.log('Data retrieved successfully');
        res.status(200).json(data);
      } else {
        console.log('No data found at the specified node.');
        res.status(404).send('No data found');
      }
    }, (errorObject) => {
      console.error('Error while accessing Firebase Realtime Database:', errorObject);
      res.status(500).send('Error retrieving data');
    });

  } catch (error) {
    console.error('Unexpected error while processing request:', error);
    res.status(500).send('Unexpected error occurred');
  }
});

app.post('/api/save_ratings', async (req, res) => {
  try {
    // Fetch the ratings from the external API
    const rating_obj = await axios.get('https://clist.by/coder/manojkumar2412/ratings/');
    
    // Handle any response error
    if (rating_obj.status != 200) {
      throw new Error(`clist service failed to fetch ratings. Status code: ${rating_obj.status}`);
    }

    // Validate the presence of data in the API response
    if (!rating_obj.data['data']) {
      throw new Error(`No data found or response structure changed from clist ratings. Status code: ${rating_obj.status}`);
    }

    // Extract and manipulate the necessary data
    const rating_data = rating_obj.data["data"];
    const resources = rating_data.resources;

    // Access data for each platform and store only the first element
    resources[CODING_PLATFORMS.CODECHEF].data = resources[CODING_PLATFORMS.CODECHEF].data[0]; 
    resources[CODING_PLATFORMS.CODEFORCES].data = resources[CODING_PLATFORMS.CODEFORCES].data[0];
    resources[CODING_PLATFORMS.LEETCODE].data = resources[CODING_PLATFORMS.LEETCODE].data[0];
    resources[CODING_PLATFORMS.ATCODER].data = resources[CODING_PLATFORMS.ATCODER].data[0];

    delete  resources[CODING_PLATFORMS.CODECHEF].colors;
    delete  resources[CODING_PLATFORMS.CODEFORCES].colors;
    delete  resources[CODING_PLATFORMS.LEETCODE].colors;
    delete  resources[CODING_PLATFORMS.ATCODER].colors;
    delete rating_data.dates;

    const docRef = await db.collection('ratings').doc("ratings").set(rating_data);
    console.log("save_ratings - Storing ratings successfully done, doc_id: " + docRef.id);
    
    // Send a success response
    res.status(201).json({ message: 'storing ratings successfully done', id: docRef.id });

  } catch (error) {
    // Catch and log any errors
    console.log("save_ratings - Error storing ratings: " + error.message);
    res.status(500).json({ error: 'Error storing ratings: ' + error.message });
  }
});

app.get('/api/ratings', async (req, res) => {
  try {
    // Retrieve the document from Firestore
    const docRef = db.collection('ratings').doc("ratings");
    const doc = await docRef.get();

    // Check if the document exists
    if (!doc.exists) {
      return res.status(404).json({ error: 'No such document!' });
    }

    // Send the document data in response
    const data = doc.data();
    res.status(200).json(data);

  } catch (error) {
    console.error("Error retrieving ratings: ", error);
    res.status(500).json({ error: 'Error retrieving ratings: ' + error.message });
  }
});

app.get('/api/rating_graph/:platform', async (req, res) => {
  const platformParam = req.params.platform.toUpperCase(); // get platform from path parameter and convert to uppercase

  // Find the matching platform from CODING_PLATFORMS
  const platformUrl = CODING_PLATFORMS[platformParam];

  if (!platformUrl) {
    return res.status(404).send(`Platform '${req.params.platform}' not found`);
  }
  try {
    let response = await axios.get('https://clist.by/coder/manojkumar2412/ratings/');
    const docRef = db.collection('ratings').doc("ratings");
    const doc = await docRef.get();

    // Check if the document exists
    if (!doc.exists) {
      return res.status(404).json({ error: 'No such document!' });
    }

    response = doc.data();
    console.log("ratings- successfully data retrieved");
    resources = response['resources']
    ratings = resources[CODING_PLATFORMS[platformParam]]
    ratings_insights= ratings['data']
    res.status(200).json(ratings_insights);
    
  } catch (error) {
    console.log("ratings- Error fetching data: "+error.message );
    res.status(500).send('Error fetching data');
  }
});



const notify = async (messageData) => {
  console.log("email: "+ process.env.FROM_EMAIL_USER +" , pass: "+process.env.FROM_EMAIL_PASS);
  const mailOptions = {
    from: process.env.FROM_EMAIL_USER,
    to: process.env.TO_EMAIL_USER,
    subject: "Hey bro, you got a message from '"+ messageData.name +"': "+messageData.subject ,
    text: messageData.message
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Notification email sent:', info.response);
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
};


app.post('/api/save_message', async (req, res) => {
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
    notify({
      email,
      name,
      subject,
      message
    });
    console.log("save_message-Message successfully added, doc_id: " + docRef.id);
    res.status(201).json({ message: 'Message successfully added', id: docRef.id });
  } catch (error) {
    console.log("save_message- Error adding message: "+ error.message );
    res.status(500).json({ error: 'Error adding message: ' + error.message });
  }
});

// Catch-all route to serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});