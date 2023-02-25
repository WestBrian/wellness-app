import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { DailyQuote } from '../types'
import { RecentMoodAverage } from '../components/RecentMoodAverage'
import { ThisWeekMoods } from '../components/ThisWeekMoods'
import { useNavbar } from '../components/Navbar'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

export interface HomeProps {
  dailyQuote: DailyQuote
}

export const Home: FC<HomeProps> = ({ dailyQuote }) => {
  const { setTitle } = useNavbar()
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      setTitle(`Hello, ${user.displayName?.split(' ').at(0) || 'User'}`)
    }
  }, [user, setTitle])

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
