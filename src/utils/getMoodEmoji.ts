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

export const getMoodEmoji = (mood: MoodData | number) => {
  const x = typeof mood === 'number' ? mood : mood.mood
  return moodOptions[x - 1]
}
