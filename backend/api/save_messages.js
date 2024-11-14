const admin = require('firebase-admin');
if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
      databaseURL: "https://personal-website-40d06-default-rtdb.asia-southeast1.firebasedatabase.app/"
    });
  }

const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, subject, message } = req.body;
    if (!email || !name || !subject || !message) {
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
      res.status(201).json({ message: 'Message successfully added', id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: 'Error adding message: ' + error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
