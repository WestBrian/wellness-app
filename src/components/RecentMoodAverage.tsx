import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Text,
  useConst,
  VStack,
} from '@chakra-ui/react'
import type { FC } from 'react'
import { usePreviousMoods } from '../hooks/usePreviousMoods'
import { determineTrend } from '../utils/determineTrend'
import { findAverageMood } from '../utils/findAverageMood'
import { getMoodEmoji } from '../utils/getMoodEmoji'
import { moodToFraction } from '../utils/moodToFraction'
import { SectionHeading } from './SectionHeading'

export interface RecentMoodAverageProps {}

export const RecentMoodAverage: FC<RecentMoodAverageProps> = ({}) => {
  const now = useConst(new Date())
  const { previousMoods } = usePreviousMoods(now, { inclusive: true })
  const lastXMoods = previousMoods?.slice(0, 7)

  const average = lastXMoods ? Math.ceil(findAverageMood(lastXMoods)) : 1
  const value = lastXMoods ? moodToFraction(average) * 100 : 0
  const trend = lastXMoods ? determineTrend(lastXMoods.map((m) => m.mood)) : 0

  let message = ''
  let word = ''

  switch (trend) {
    case 1:
      message = 'Good job!'
      word = 'increasing'
      break
    case -1:
      message = 'Uh oh!'
      word = 'decreasing'
      break
    case 0:
      message = average >= 0.5 ? 'Good job!' : 'Uh oh!'
      word = 'stable'
      break
  }

  return (
    <VStack w={'full'} align={'start'} spacing={4}>
      <SectionHeading>Recent Mood Average</SectionHeading>
      <HStack spacing={6} align={'start'}>
        <CircularProgress size={'75px'} color={'orange.400'} value={value}>
          <CircularProgressLabel fontSize={'3xl'}>
            {lastXMoods ? getMoodEmoji(average) : ''}
          </CircularProgressLabel>
        </CircularProgress>
        {lastXMoods ? (
          <Text maxW={'260px'}>
            {message} Your mood has been{' '}
            <Box as={'span'} fontWeight={'semibold'}>
              {word}
            </Box>{' '}
            over the past{' '}
            <Box as={'span'} fontWeight={'semibold'}>
              {lastXMoods.length}
            </Box>{' '}
            entries.
          </Text>
        ) : (
          <Text color={'gray.400'}>No recent moods entered.</Text>
        )}
      </HStack>
    </VStack>
  )
}
