const admin = require('firebase-admin');
require('dotenv').config();
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          databaseURL: process.env.FIREBASE_DATABASE_URL
        }),
      });
      
  }

export default async function handler(req, res) {
  if (req.method === 'GET') {
        try {
          // Retrieve the document from Firestore
          const db = admin.firestore();
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
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
