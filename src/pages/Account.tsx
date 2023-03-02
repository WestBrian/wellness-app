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

export interface AccountProps {}

export const Account: FC<AccountProps> = ({}) => {
  const [user] = useAuthState(auth)
  const { setTitle } = useNavbar()
  const [settings] = useUserSettings()
  const userDoc = doc(db, `users/${user!.uid}`).withConverter(UserConverter)

  const handleCollectWeatherChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked

    updateDoc(userDoc, {
      collectWeather: checked,
    })
  }

  useEffect(() => {
    setTitle('My Account')
  }, [setTitle])

  return (
    <VStack w={'full'} align={'start'} spacing={8}>
      <Box w={'full'} p={4} bg={'gray.100'} rounded={'lg'}>
        <HStack spacing={4} align={'start'}>
          <Box
            w={'75px'}
            h={'75px'}
            bg={'gray.300'}
            rounded={'full'}
            overflow={'hidden'}
          >
            {user!.photoURL && (
              <Image
                src={user!.photoURL}
                width={75}
                height={75}
                alt={'profile picture'}
                priority
              />
            )}
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
