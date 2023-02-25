import type { MoodData } from '../types/mood'

export const findAverageMood = (moods: MoodData[]) => {
  const sum = moods.map((mood) => mood.mood).reduce((a, b) => a + b, 0)
  return sum / moods.length
}
