require('dotenv').config();
const admin = require('firebase-admin');

// Faz o parse da string JSON
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Corrige a private_key manualmente (se ainda estiver com \\n como texto)
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cr-cursos-eded0-default-rtdb.firebaseio.com',
  storageBucket: 'cr-cursos-eded0.appspot.com'
});

const db = admin.database();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };
