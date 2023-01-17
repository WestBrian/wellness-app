import type { MoodData } from '../types/mood'
import { FirestoreDataConverter } from 'firebase/firestore'

export const MoodConverter: FirestoreDataConverter<MoodData> = {
  toFirestore: (modelObject) => {
    return {
      mood: modelObject.mood,
      date: modelObject.date,
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data({ ...options, serverTimestamps: 'estimate' })!
    return {
      id: snapshot.id,
      mood: data.mood,
      date: data.date.toDate(),
    }
  },
}
