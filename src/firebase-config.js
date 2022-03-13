import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  // apiKey: 'AIzaSyABtf-9FYAydvcm4P7PkQTdrY-znAbIlIM',
  // authDomain: 'tracking-practice.firebaseapp.com',
  // projectId: 'tracking-practice',
  // storageBucket: 'tracking-practice.appspot.com',
  // messagingSenderId: '83588237446',
  // appId: '1:83588237446:web:381045282afdd3fdc76907',
  // measurementId: 'G-4E6PDRN0N2',

  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
