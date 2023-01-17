import { FC, useEffect } from 'react'
import { Box, Heading, VStack } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { auth } from '../firebase'
import { MoodTracker } from '../components/MoodTracker'

export interface DashboardProps {}

export const Dashboard: FC<DashboardProps> = ({}) => {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (!user && !loading) {
      router.push('/sign-in')
    }
  }, [user, loading, router])

  if (!user) {
    return null
  }

  return (
    <VStack w={'full'} align={'start'} spacing={8}>
      <Heading>
        Welcome back{' '}
        <Box as={'span'} color={'orange.400'}>
          {user.displayName}
        </Box>
      </Heading>
      <MoodTracker user={user} />
    </VStack>
  )
}
