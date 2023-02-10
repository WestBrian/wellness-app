import { Box, Flex, Text, useConst, VStack, HStack } from '@chakra-ui/react'
import type { FC } from 'react'
import { useMood } from '../hooks/useMood'
import { usePreviousMoods } from '../hooks/usePreviousMoods'
import { DailyQuote } from '../types'
import { format } from 'date-fns'
import type { MoodData } from '../types/mood'
import { getMoodEmoji, moodOptions } from '../utils/getMoodEmoji'
import { toPercent } from '../utils/toPercent'
import { moodToFraction } from '../utils/moodToFraction'

interface MoodDetailProps {
  mood: MoodData
}

const MoodDetail: FC<MoodDetailProps> = ({ mood }) => {
  return (
    <VStack
      spacing={0}
      justify={'center'}
      bg={'orange.100'}
      rounded={'lg'}
      px={4}
      py={2}
    >
      <Text fontSize={'4xl'} mt={-2}>
        {getMoodEmoji(mood)}
      </Text>
      <Text fontSize={'sm'} fontWeight={'bold'} color={'orange.600'}>
        {toPercent(moodToFraction(mood))}
      </Text>
      <Text fontSize={'xs'} fontWeight={'semibold'} color={'orange.400'}>
        {format(mood.date, 'LLL do')}
      </Text>
    </VStack>
  )
}

export interface HomeProps {
  dailyQuote: DailyQuote
}

export const Home: FC<HomeProps> = ({ dailyQuote }) => {
  const now = useConst(new Date())
  const { mood: currentMood } = useMood(now)
  const { previousMoods } = usePreviousMoods(now)

  return (
    <VStack w={'full'} align={'start'} spacing={8}>
      <Box w={'full'} bg={'gray.100'} rounded={'lg'} p={4}>
        <Text fontStyle={'italic'}>&quot;{dailyQuote.q}&quot;</Text>
        <Flex w={'full'} justify={'end'}>
          <Text fontSize={'sm'}>- {dailyQuote.a}</Text>
        </Flex>
      </Box>
      <VStack w={'full'} align={'start'} spacing={2}>
        <Text textStyle={'h2'}>Mood Progression</Text>
        <HStack spacing={4}>
          {previousMoods?.slice(0, 3).map((mood) => (
            <MoodDetail key={mood.id} mood={mood} />
          ))}
          {currentMood ? (
            <MoodDetail mood={currentMood} />
          ) : (
            <Box
              maxW={'76px'}
              h={'101px'}
              bg={'gray.100'}
              rounded={'lg'}
              px={2}
              py={2}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text fontSize={'xs'} fontWeight={'semibold'} color={'gray.500'}>
                No mood recorded yet today
              </Text>
            </Box>
          )}
        </HStack>
      </VStack>
    </VStack>
  )
}
