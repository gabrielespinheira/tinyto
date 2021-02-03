import firebaseAdmin from 'firebase-admin'

const firebaseAdminConfig = {
  credential: firebaseAdmin.credential.cert({
    implicit: false,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  }),
  databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL,
}

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp(firebaseAdminConfig)
} else {
  firebaseAdmin.app()
}

export default firebaseAdmin
