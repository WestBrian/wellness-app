import { Box, HStack, useConst, VStack, Text } from '@chakra-ui/react'
import type { FC } from 'react'
import { SectionHeading } from './SectionHeading'
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
} from 'date-fns'
import { useRangeOfMoods } from '../hooks/useRangeOfMoods'
import type { MoodData } from '../types/mood'
import { getMoodEmoji } from '../utils/getMoodEmoji'
import { moodToFraction } from '../utils/moodToFraction'
import { motion } from 'framer-motion'
import { FramerBox } from './FramerBox'

interface DayBarProps {
  date: Date
  mood?: MoodData
}

const DayBar: FC<DayBarProps> = ({ date, mood }) => {
  const total = 150

  return (
    <VStack spacing={2}>
      <Text fontSize={'sm'}>{format(date, 'EEE')}</Text>
      <Box position={'relative'}>
        <Box bg={'gray.100'} rounded={'lg'} w={'25px'} h={`${total}px`} />
        {mood && (
          <FramerBox
            as={motion.div}
            bg={mood.mood <= 4 ? 'green.400' : 'red.400'}
            rounded={'lg'}
            w={'25px'}
            position={'absolute'}
            bottom={0}
            initial={{ height: 0 }}
            animate={{ height: `${total * moodToFraction(mood)}px` }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        )}
      </Box>
      <Text h={'24px'}>{mood ? getMoodEmoji(mood) : '🫥'}</Text>
    </VStack>
  )
}

export interface ThisWeekMoodsProps {}

export const ThisWeekMoods: FC<ThisWeekMoodsProps> = ({}) => {
  const now = useConst(new Date())
  const start = startOfWeek(now)
  const end = endOfWeek(now)
  const { previousMoods } = useRangeOfMoods(start, end)
  const days = eachDayOfInterval({ start, end })

  return (
    <VStack w={'full'} align={'start'} spacing={4}>
      <SectionHeading>This Week</SectionHeading>
      <HStack w={'full'} spacing={6}>
        {days.map((date) => (
          <DayBar
            key={date.toString()}
            date={date}
            mood={previousMoods?.find((m) => isSameDay(m.date, date))}
          />
        ))}
      </HStack>
    </VStack>
  )
}
