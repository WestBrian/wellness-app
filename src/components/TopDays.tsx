import type { FC } from 'react'
import { HStack, VStack, Text, StackDivider } from '@chakra-ui/react'
import { SectionHeadingSmall } from './SectionHeading'
import type { MoodData } from '../types/mood'
import { getDay } from 'date-fns'
import { findAverageMood } from '../utils/findAverageMood'
import { getMoodEmoji } from '../utils/getMoodEmoji'

export const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export interface TopDaysProps {
  moods: MoodData[]
}

export const TopDays: FC<TopDaysProps> = ({ moods }) => {
  const data = daysOfTheWeek
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
      <SectionHeadingSmall>Top Days</SectionHeadingSmall>
      <HStack
        w={'full'}
        spacing={4}
        overflowX={'scroll'}
        divider={<StackDivider />}
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {data.map((d) => (
          <VStack key={d.day} spacing={0} align={'center'}>
            <Text fontSize={'sm'} color={'gray.500'}>
              {d.day}
            </Text>
            <Text fontSize={'xl'} fontWeight={'semibold'} color={'gray.600'}>
              {getMoodEmoji(Math.ceil(d.average))}
            </Text>
          </VStack>
        ))}
      </HStack>
    </VStack>
  )
}
