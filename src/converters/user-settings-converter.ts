import type { UserSettings } from '../types/user'
import { FirestoreDataConverter } from 'firebase/firestore'

export const UserConverter: FirestoreDataConverter<UserSettings> = {
  toFirestore: (modelObject) => {
    return {
      collectWeather: modelObject.collectWeather,
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data({ ...options, serverTimestamps: 'estimate' })!
    return {
      id: snapshot.id,
      collectWeather: !!data.collectWeather,
    }
  },
}
