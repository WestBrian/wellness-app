import type { MoodData } from '../types/mood'

export const findAverageMood = (moods: MoodData[]) => {
  const sum = moods.map((mood) => mood.mood).reduce((a, b) => a + b)
  return sum / moods.length
}
