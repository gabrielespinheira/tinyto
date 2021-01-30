import firebaseAdmin from 'firebase-admin'

var serviceAccount = require('services/firebase/serviceAccountKey.json')

const firebaseAdminConfig = {
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL,
}

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp(firebaseAdminConfig)
} else {
  firebaseAdmin.app()
}

export default firebaseAdmin
