const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cr-cursos-eded0-default-rtdb.firebaseio.com'
});

const db = admin.firestore();

module.exports = { admin, db };
