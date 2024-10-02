const express = require('express');
const axios = require('axios');
const cors = require('cors');  
const admin = require('firebase-admin');
const serviceAccount = require('./firebase_creds.json'); // Replace with the correct path
const fs = require('fs/promises'); // Using fs/promises for promise-based file system
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://personal-website-40d06-default-rtdb.asia-southeast1.firebasedatabase.app/',
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
const port = 3001;
app.use(cors());
app.use(express.json());




// Define a route to retrieve data from Realtime Database
app.get('/titles', async (req, res) => {
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

app.post('/save_ratings', async (req, res) => {
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

app.get('/ratings', async (req, res) => {
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

app.get('/rating_graph/:platform', async (req, res) => {
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