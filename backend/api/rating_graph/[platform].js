const admin = require('firebase-admin');
const axios = require('axios');

// Initialize Firebase Admin SDK (ensure this is only done once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const CODING_PLATFORMS = Object.freeze({
  CODECHEF: 'codechef.com',
  CODEFORCES: 'codeforces.com',
  ATCODER: 'atcoder.jp',
  LEETCODE: 'leetcode.com',
});

const db = admin.firestore();

module.exports = async (req, res) => {
  const { platform } = req.query; // Vercel uses `req.query` for dynamic routes

  if (!platform) {
    return res.status(400).json({ error: 'Platform parameter is required' });
  }

  const platformParam = platform.toUpperCase();
  const platformUrl = CODING_PLATFORMS[platformParam];

  if (!platformUrl) {
    return res.status(404).send(`Platform '${platform}' not found`);
  }

  try {
    // Fetch the ratings document from Firestore
    const docRef = db.collection('ratings').doc('ratings');
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'No such document!' });
    }

    const response = doc.data();
    console.log('Ratings successfully retrieved from Firestore');

    const resources = response['resources'];
    const ratings = resources[platformUrl];
    const ratingsInsights = ratings['data'];

    return res.status(200).json(ratingsInsights);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return res.status(500).json({ error: 'Error fetching data' });
  }
};
