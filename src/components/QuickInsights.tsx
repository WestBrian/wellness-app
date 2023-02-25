import type { FC } from 'react'
import {
  VStack,
  Text,
  HStack,
  StackDivider,
  Heading,
  TypographyProps,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Box,
} from '@chakra-ui/react'
import type { MoodData } from '../types/mood'
import { useActivities } from '../hooks/useActivities'
import { findAverageMood } from '../utils/findAverageMood'
import { daysOfTheWeek } from './TopDays'
import { getDay } from 'date-fns'
import { SectionHeadingSmall } from './SectionHeading'
import { useSortedActivities } from '../hooks/useSortedActivities'

interface InsightBoxProps {
  title: string
  data?: string
}

const InsightBox: FC<InsightBoxProps> = ({ title, data }) => {
  return (
    <Box w={'full'} p={2} bg={'blue.50'} rounded={'lg'}>
      <Text
        fontSize={'xs'}
        fontWeight={'bold'}
        color={'blue.300'}
        textTransform={'uppercase'}
        letterSpacing={'wider'}
      >
        {title}
      </Text>
      <Text fontSize={'md'} fontWeight={'semibold'} color={'blue.500'}>
        {data || '—'}
      </Text>
    </Box>
  )
}

export interface QuickInsightsProps {
  moods: MoodData[]
}

export const QuickInsights: FC<QuickInsightsProps> = ({ moods }) => {
  const activityData = useSortedActivities(moods)
  const dayData = daysOfTheWeek
    .map((day, index) => ({
      day,
      average: findAverageMood(moods.filter((m) => getDay(m.date) === index)),
    }))
    .filter((d) => !isNaN(d.average))
    .sort((a, b) => {
      if (a.average > b.average) {
        return 1
      } else if (a.average < b.average) {
        return -1
      } else {
        return 0
      }
    })

  return (
    <VStack w={'full'} align={'start'} spacing={2}>
      <SectionHeadingSmall>Best of Month</SectionHeadingSmall>
      <VStack w={'full'} align={'start'}>
        <HStack w={'full'}>
          <InsightBox title={'day'} data={dayData.at(0)?.day} />
          <InsightBox title={'weather'} />
        </HStack>
        <InsightBox
          title={'activity'}
          data={activityData?.at(0)?.activity.activity}
        />
      </VStack>
    </VStack>
  )
}
