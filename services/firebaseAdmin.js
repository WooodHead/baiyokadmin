const admin = require('firebase-admin')
const serviceAccount = require('./baiyok-firebase-admin.json')
serviceAccount.private_key = process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

module.exports = {
  firebaseAdmin: app
}
