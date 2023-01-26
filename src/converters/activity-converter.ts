import type { ActivityData } from '../types/activity'
import { FirestoreDataConverter } from 'firebase/firestore'

export const ActivityConverter: FirestoreDataConverter<ActivityData> = {
  toFirestore: (modelObject) => {
    return {
      activity: modelObject.activity,
      enabled: modelObject.enabled,
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data({ ...options, serverTimestamps: 'estimate' })!
    return {
      id: snapshot.id,
      activity: data.activity,
      enabled: data.enabled,
    }
  },
}
