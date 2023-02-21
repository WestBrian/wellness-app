import { collection } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { ActivityConverter } from '../converters/activity-converter'
import { auth, db } from '../firebase'

export const useActivities = () => {
  const [user] = useAuthState(auth)
  const activitiesCol = collection(
    db,
    `users/${user!.uid}/activities`
  ).withConverter(ActivityConverter)
  return useCollectionData(activitiesCol)
}
