import type { MoodData } from '../types/mood'
import { moodOptions } from './getMoodEmoji'

export const moodToFraction = (mood: MoodData) => {
  const l = moodOptions.length
  return (l - mood.mood + 1) / l
}
