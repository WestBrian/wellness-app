import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import type { FC } from 'react'
import { DailyQuote } from '../types'
import { RecentMoodAverage } from '../components/RecentMoodAverage'
import { ThisWeekMoods } from '../components/ThisWeekMoods'

export interface HomeProps {
  dailyQuote: DailyQuote
}

export const Home: FC<HomeProps> = ({ dailyQuote }) => {
  return (
    <VStack w={'full'} align={'start'} spacing={10}>
      <Box w={'full'} bg={'gray.100'} rounded={'lg'} p={4}>
        <Text fontStyle={'italic'}>&quot;{dailyQuote.q}&quot;</Text>
        <Flex w={'full'} justify={'end'}>
          <Text fontSize={'sm'}>- {dailyQuote.a}</Text>
        </Flex>
      </Box>
      <RecentMoodAverage />
      <ThisWeekMoods />
    </VStack>
  )
}
