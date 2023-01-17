import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator, onAuthStateChanged } from 'firebase/auth'
import {
  getFirestore,
  connectFirestoreEmulator,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCbJK4PY-vrhk9Bn4NQArmkfkbo7Dr_CQM',
  authDomain: 'wellness-app-e32e8.firebaseapp.com',
  projectId: 'wellness-app-e32e8',
  storageBucket: 'wellness-app-e32e8.appspot.com',
  messagingSenderId: '168397491637',
  appId: '1:168397491637:web:4bfd4b212a37d1673d1dfc',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099', {
    disableWarnings: true,
  })
  connectFirestoreEmulator(db, 'localhost', 8080)
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, `users/${user.uid}`)
    const userDoc = await getDoc(userRef)
    if (!userDoc.exists()) {
      setDoc(userRef, {})
    }
  }
})
