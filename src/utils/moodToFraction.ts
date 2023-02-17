import type { MoodData } from '../types/mood'
import { moodOptions } from './getMoodEmoji'

export const moodToFraction = (mood: MoodData | number) => {
  const l = moodOptions.length
  const x = typeof mood === 'number' ? mood : mood.mood
  return (l - x + 1) / l
}
