import { FC, useEffect } from 'react'
import { VStack, Box } from '@chakra-ui/react'
import { Line } from 'react-chartjs-2'
import { useRangeOfMoods } from '../hooks/useRangeOfMoods'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { getMoodEmoji, moodOptions } from '../utils/getMoodEmoji'
import { TopDays } from '../components/TopDays'
import { QuickInsights } from '../components/QuickInsights'
import { TopActivities } from '../components/TopActivities'
import { useNavbar } from '../components/Navbar'
import { InsightRangeSelector } from '../components/InsightRangeSelector'
import { useAtom } from 'jotai'
import { monthAtom } from '../store'

export interface DashboardProps {}

export const Dashboard: FC<DashboardProps> = ({}) => {
  const [date] = useAtom(monthAtom)
  const { previousMoods } = useRangeOfMoods(
    startOfMonth(date),
    endOfMonth(date)
  )
  const moods = previousMoods?.reverse()
  const { setTitle } = useNavbar()

  useEffect(() => {
    setTitle('Insights')
  }, [setTitle])

  return (
    <VStack w={'full'} align={'start'} spacing={8}>
      <VStack w={'full'} spacing={4}>
        <InsightRangeSelector />
        <Box w={'full'}>
          {moods && (
            <Line
              data={{
                labels: moods.map((mood) => format(mood.date, 'do')),
                datasets: [
                  {
                    label: 'Moods',
                    data: moods.map(
                      (mood) => moodOptions.length - mood.mood + 1
                    ),
                    fill: false,
                    tension: 0.3,
                    backgroundColor: '#DD6B20',
                    borderColor: '#ED8936',
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    min: 1,
                    max: moodOptions.length,
                    ticks: {
                      callback: (label) => {
                        return getMoodEmoji(
                          moodOptions.length - Number(label) + 1
                        )
                      },
                    },
                  },
                },
                clip: false,
              }}
            />
          )}
        </Box>
      </VStack>
      {moods && <QuickInsights moods={moods} />}
      {moods && <TopDays moods={moods} />}
      {moods && <TopActivities moods={moods} />}
    </VStack>
  )
}
