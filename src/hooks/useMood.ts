import { addDays, startOfDay, endOfDay } from 'date-fns'
import { collection, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { MoodConverter } from '../converters/mood-converter'
import { auth, db } from '../firebase'

export const useMood = (date: Date) => {
  const [user] = useAuthState(auth)
  const moodCol = collection(db, `users/${user!.uid}/moods`).withConverter(
    MoodConverter
  )
  const [moods] = useCollectionData(
    query(
      moodCol,
      where('date', '<', addDays(startOfDay(date), 1)),
      where('date', '>', addDays(endOfDay(date), -1))
    )
  )
  const mood = moods?.at(0)
  return { mood }
}
