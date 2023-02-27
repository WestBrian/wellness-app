import { doc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { UserConverter } from '../converters/user-settings-converter'
import { auth, db } from '../firebase'

export const useUserSettings = () => {
  const [user] = useAuthState(auth)
  const userDoc = doc(db, `users/${user!.uid}`).withConverter(UserConverter)
  return useDocumentData(userDoc)
}
