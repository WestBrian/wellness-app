import type { MoodData } from '../types/mood'

export const moodOptions = [
  '😭',
  '😢',
  '🙁',
  '😕',
  '😐',
  '🙂',
  '😀',
  '😄',
].reverse()

export const getMoodEmoji = (mood: MoodData) => {
  return moodOptions[mood.mood - 1]
}
