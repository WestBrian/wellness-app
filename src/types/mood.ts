interface Weather {
  temp: number
  condition: number
}

export interface MoodData {
  id: string
  mood: number
  date: Date
  activities: string[]
  weather?: Weather
}
