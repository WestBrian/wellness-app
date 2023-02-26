import {
  Box,
  HStack,
  VStack,
  Text,
  Switch,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { ChangeEvent, FC, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import Image from 'next/image'
import { useNavbar } from '../components/Navbar'
import { SectionHeadingSmall } from '../components/SectionHeading'
import { doc, updateDoc } from 'firebase/firestore'
import { useUserSettings } from '../hooks/useUserSettings'
import { UserConverter } from '../converters/user-settings-converter'
import { getLocation } from '../utils/getLocation'
import { customFetch } from '../utils/customFetch'

const demoImageUrl =
  'https://images.unsplash.com/photo-1587778082149-bd5b1bf5d3fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw5NDUyNDk0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'

export interface AccountProps {}

export const Account: FC<AccountProps> = ({}) => {
  const [user] = useAuthState(auth)
  const { setTitle } = useNavbar()
  const [settings] = useUserSettings()
  const userDoc = doc(db, `users/${user!.uid}`).withConverter(UserConverter)

  const photoUrl = user!.photoURL || demoImageUrl

  const handleCollectWeatherChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked

    updateDoc(userDoc, {
      collectWeather: checked,
    })

    if (checked) {
      getLocation()
    }
  }

  useEffect(() => {
    setTitle('My Account')
  }, [setTitle])

  return (
    <VStack w={'full'} align={'start'} spacing={8}>
      <Box w={'full'} p={4} bg={'gray.100'} rounded={'lg'}>
        <HStack spacing={4} align={'start'}>
          <Box w={'75px'} h={'75px'} rounded={'full'} overflow={'hidden'}>
            <Image
              src={photoUrl}
              alt={'profile picture'}
              width={75}
              height={75}
              priority
            />
          </Box>
          <VStack spacing={0} align={'start'}>
            <Text fontSize={'md'}>{user!.displayName}</Text>
            <Text fontSize={'xs'} color={'gray.400'}>
              {user!.email}
            </Text>
          </VStack>
        </HStack>
      </Box>
      <VStack w={'full'} align={'start'} spacing={2}>
        <SectionHeadingSmall>Settings</SectionHeadingSmall>
        <FormControl display={'flex'} alignItems={'center'}>
          <Switch
            id={'weather-switch'}
            isChecked={settings?.collectWeather}
            mr={2}
            onChange={handleCollectWeatherChange}
          />
          <FormLabel htmlFor={'weather-switch'} mb={0} fontSize={'sm'}>
            Collect weather data
          </FormLabel>
        </FormControl>
      </VStack>
    </VStack>
  )
}
