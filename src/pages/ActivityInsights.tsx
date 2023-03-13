import { VStack, Text, Flex, HStack, Box, Collapse } from '@chakra-ui/react'
import { endOfMonth, startOfMonth } from 'date-fns'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { FC, useEffect, useState } from 'react'
import { FramerBox } from '../components/FramerBox'
import { InsightRangeSelector } from '../components/InsightRangeSelector'
import { useNavbar } from '../components/Navbar'
import { useActivities } from '../hooks/useActivities'
import { useRangeOfMoods } from '../hooks/useRangeOfMoods'
import { useSortedActivities } from '../hooks/useSortedActivities'
import { monthAtom } from '../store'
import type { ActivityData } from '../types/activity'
import { moodToFraction } from '../utils/moodToFraction'
import { toPercent } from '../utils/toPercent'

interface ActivityCardProps {
  activity: ActivityData
  num: number
  moodAverage: number
  appeared: number
}

const ActivityCard: FC<ActivityCardProps> = ({
  activity,
  num,
  moodAverage,
  appeared,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen((open) => !open)
  }

  return (
    <FramerBox
      w={'full'}
      bg={'gray.100'}
      p={2}
      rounded={'md'}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * (num - 1) }}
    >
      <Flex
        w={'full'}
        justify={'space-between'}
        align={'center'}
        onClick={toggleOpen}
      >
        <HStack spacing={4}>
          <Text color={'gray.400'} fontWeight={'bold'}>
            {num}
          </Text>
          <Text>{activity.activity}</Text>
        </HStack>
        <Text
          fontSize={'sm'}
          color={'gray.400'}
          fontWeight={'semibold'}
          textTransform={'uppercase'}
        >
          <Box as={'span'} color={'gray.500'} fontWeight={'bold'}>
            {toPercent(moodToFraction(Math.ceil(moodAverage)))}
          </Box>{' '}
          ★
        </Text>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box pt={4}>
          <Text fontSize={'sm'}>Appeared {appeared} times</Text>
        </Box>
      </Collapse>
    </FramerBox>
  )
}

export interface ActivityInsightsProps {}

export const ActivityInsights: FC<ActivityInsightsProps> = ({}) => {
  const { setTitle } = useNavbar()
  const [month] = useAtom(monthAtom)
  const { previousMoods: moods } = useRangeOfMoods(
    startOfMonth(month),
    endOfMonth(month)
  )
  const activityData = useSortedActivities(moods || [])

  useEffect(() => {
    setTitle('Activity Insights')
  })

  return (
    <VStack w={'full'} spacing={8}>
      <InsightRangeSelector />
      <VStack w={'full'} align={'end'} spacing={2}>
        <Text fontSize={'xs'} color={'gray.400'}>
          Click an activity to toggle detailed insights
        </Text>
        {activityData?.map((data, index) => (
          <ActivityCard
            key={data.activity.id}
            activity={data.activity}
            num={index + 1}
            moodAverage={data.average}
            appeared={data.appeared}
          />
        ))}
      </VStack>
    </VStack>
  )
}
