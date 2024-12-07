const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

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

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.FROM_EMAIL_USER,
    pass: process.env.FROM_EMAIL_PASS,
  },
});

// Notification function
const notify = async (messageData) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL_USER,
    to: process.env.TO_EMAIL_USER,
    subject: `Hey bro, you got a message from '${messageData.name}': ${messageData.subject}`,
    text: messageData.message,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Notification email sent:', info.response);
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
};

// Vercel serverless function
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, name, subject, message } = req.body;

  // Validate input fields
  if (!email || !name || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const db = admin.firestore();

    // Save the message to Firestore
    const docRef = await db.collection('messages').add({
      email,
      name,
      subject,
      message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Send email notification
    await notify({ email, name, subject, message });

    console.log(`Message successfully added, doc_id: ${docRef.id}`);
    return res.status(201).json({ message: 'Message successfully added', id: docRef.id });
  } catch (error) {
    console.error('Error adding message:', error.message);
    return res.status(500).json({ error: `Error adding message: ${error.message}` });
  }
};
