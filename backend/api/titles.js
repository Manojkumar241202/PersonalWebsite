const admin = require('firebase-admin');
require('dotenv').config();
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
      
  }
const rdb = admin.database();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
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
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
