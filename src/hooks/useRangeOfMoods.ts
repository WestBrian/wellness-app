import { isAfter, isBefore } from 'date-fns'
import { collection, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { MoodConverter } from '../converters/mood-converter'
import { auth, db } from '../firebase'

export const useRangeOfMoods = (start: Date, end: Date) => {
  const [user] = useAuthState(auth)
  const moodCol = collection(db, `users/${user!.uid}/moods`).withConverter(
    MoodConverter
  )
  const [moods] = useCollectionData(
    query(moodCol, where('date', '>', start), where('date', '<', end))
  )

  const previousMoods = moods?.sort((m1, m2) => {
    if (isAfter(m1.date, m2.date)) {
      return -1
    } else if (isBefore(m1.date, m2.date)) {
      return 1
    } else {
      return 0
    }
  })

  return { previousMoods }
}
