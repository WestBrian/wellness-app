import { FC, useState } from 'react'
import { VStack, Skeleton } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { DatePicker } from '../components/DatePicker'
import { MoodTracker } from '../components/MoodTracker'

export interface DashboardProps {}

export const Dashboard: FC<DashboardProps> = ({}) => {
  const [user] = useAuthState(auth)
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <VStack w={'full'} align={'start'} spacing={8}>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </VStack>
  )
}
