import type { MoodData } from '../types/mood'
import { findAverageMood } from '../utils/findAverageMood'
import { useActivities } from './useActivities'

export const useSortedActivities = (moods: MoodData[]) => {
  const [activities] = useActivities()
  const sortedActivities = activities
    ?.map((activity) => {
      const moodsWithActivity = moods.filter((mood) =>
        mood.activities.includes(activity.id)
      )
      return {
        activity,
        appeared: moodsWithActivity.length,
        average: findAverageMood(moodsWithActivity),
      }
    })
    .filter((data) => !isNaN(data.average))
    .sort((a, b) => {
      if (a.average > b.average) {
        return 1
      } else if (a.average < b.average) {
        return -1
      } else {
        return 0
      }
    })
  return sortedActivities
}
