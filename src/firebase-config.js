import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyABtf-9FYAydvcm4P7PkQTdrY-znAbIlIM',
  authDomain: 'tracking-practice.firebaseapp.com',
  projectId: 'tracking-practice',
  storageBucket: 'tracking-practice.appspot.com',
  messagingSenderId: '83588237446',
  appId: '1:83588237446:web:381045282afdd3fdc76907',
  measurementId: 'G-4E6PDRN0N2',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
