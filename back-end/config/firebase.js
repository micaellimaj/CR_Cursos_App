require('dotenv').config();
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cr-cursos-eded0-default-rtdb.firebaseio.com',
  storageBucket: 'cr-cursos-eded0.appspot.com'
});

const db = admin.database();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };
