import {
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Text,
  VStack,
  HStack,
  Box,
  Wrap,
  WrapItem,
  Flex,
  Link,
  chakra,
  useRadioGroup,
  useRadio,
  useCheckbox,
  useCheckboxGroup,
  useConst,
  useToast,
} from '@chakra-ui/react'
import { FC, ReactNode, useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ActivityConverter } from '../converters/activity-converter'
import { MoodConverter } from '../converters/mood-converter'
import { useMood } from '../hooks/useMood'
import { moodOptions } from '../utils/getMoodEmoji'
import NextLink from 'next/link'
import { useUserSettings } from '../hooks/useUserSettings'
import { getForecast } from '../utils/getForecast'

interface CustomMoodRadioProps {
  text: string
}

const CustomMoodRadio: FC<CustomMoodRadioProps> = ({ text, ...radioProps }) => {
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
    useRadio(radioProps)

  return (
    <chakra.label {...htmlProps} cursor={'pointer'}>
      <input {...getInputProps({})} hidden />
      <Box
        key={text}
        rounded={'full'}
        w={'40px'}
        h={'40px'}
        bg={state.isChecked ? 'orange.300' : 'orange.100'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        {...getCheckboxProps()}
      >
        <Box {...getLabelProps()}>{text}</Box>
      </Box>
    </chakra.label>
  )
}

interface CustomActivityCheckboxProps {
  color: number
  children: ReactNode
}

const CustomActivityCheckbox: FC<CustomActivityCheckboxProps> = ({
  color,
  children,
  ...checkboxProps
}) => {
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
    useCheckbox(checkboxProps)
  const colors = ['red', 'blue', 'green', 'teal', 'purple']
  const c = colors[color % colors.length]

  return (
    <chakra.label {...htmlProps} cursor={'pointer'}>
      <input {...getInputProps({})} hidden />
      <Box
        bg={`blue.${state.isChecked ? '3' : '1'}00`}
        rounded={'full'}
        px={3}
        py={1}
        fontSize={'sm'}
        color={`blue.800`}
        {...getCheckboxProps()}
      >
        <Box as={'span'} {...getLabelProps()}>
          {children}
        </Box>
      </Box>
    </chakra.label>
  )
}

export interface MoodFormProps {
  onClose: () => void
}

export const MoodForm: FC<MoodFormProps> = ({ onClose }) => {
  const [user] = useAuthState(auth)
  const now = useConst(new Date())
  const [settings] = useUserSettings()
  const [hasRehydrated, setHasRehydrated] = useState(false)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  const moodCol = collection(db, `users/${user!.uid}/moods`).withConverter(
    MoodConverter
  )
  const activitiesCol = collection(
    db,
    `users/${user!.uid}/activities`
  ).withConverter(ActivityConverter)

  const [activities] = useCollectionData(activitiesCol)
  const { mood: currentMood } = useMood(now)

  const {
    value: selectedMood,
    setValue: setSelectedMood,
    getRadioProps,
    getRootProps,
  } = useRadioGroup()
  const {
    value: selectedActivities,
    setValue: setSelectedActivities,
    getCheckboxProps,
  } = useCheckboxGroup()

  useEffect(() => {
    if (currentMood && !hasRehydrated) {
      setSelectedMood(String(currentMood.mood))
      setSelectedActivities(currentMood.activities)
      setHasRehydrated(true)
    }
  }, [currentMood, hasRehydrated, setSelectedMood, setSelectedActivities])

  // Refactor to a more accessible solution
  const handleSubmit = async () => {
    setSaving(true)
    let weather = undefined

    if (!currentMood && settings?.collectWeather) {
      try {
        const forecast = await getForecast()
        const today = forecast.forecast.forecastday.at(0)
        if (today) {
          weather = {
            temp: today.day.maxtemp_f,
            condition: today.day.condition.code,
          }
        }
      } catch (e) {
        toast({
          title: 'Weather Data Not Saved',
          description:
            'Try changing your location services within your settings',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
      }
    }

    if (currentMood) {
      updateDoc(doc(moodCol, currentMood.id), {
        mood: Number(selectedMood),
        date: now,
        activities: selectedActivities as string[],
      })
    } else {
      addDoc(moodCol, {
        id: '-1',
        mood: Number(selectedMood),
        date: now,
        activities: selectedActivities as string[],
        weather,
      })
    }
    onClose()
    setSaving(false)
  }

  return (
    <>
      <DrawerCloseButton />
      <DrawerHeader>{currentMood ? 'Update' : 'New'} Mood</DrawerHeader>

      <DrawerBody>
        <VStack w={'full'} spacing={8} align={'start'}>
          <VStack w={'full'} spacing={2} align={'start'}>
            <Text textStyle={'h2'}>
              Mood{' '}
              <Box as={'span'} color={'gray.400'}>
                ({format(now, 'E MM/dd')})
              </Box>
            </Text>
            <HStack
              w={'full'}
              spacing={2}
              overflowX={'scroll'}
              sx={{
                '::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
              {...getRootProps()}
            >
              {moodOptions.map((text, index) => (
                <CustomMoodRadio
                  key={text}
                  text={text}
                  {...getRadioProps({ value: String(index + 1) })}
                />
              ))}
            </HStack>
          </VStack>
          <VStack spacing={2} align={'start'}>
            <Flex w={'full'} justify={'space-between'}>
              <Text textStyle={'h2'}>Activities</Text>
              <Link
                as={NextLink}
                href={'/user/activities'}
                color={'blue.500'}
                fontSize={'sm'}
                onClick={onClose}
              >
                Edit
              </Link>
            </Flex>
            <Wrap>
              {activities
                ?.filter((a) => a.enabled)
                .map(({ id, activity }, index) => (
                  <WrapItem key={id}>
                    <CustomActivityCheckbox
                      color={index}
                      {...getCheckboxProps({ value: id })}
                    >
                      {activity}
                    </CustomActivityCheckbox>
                  </WrapItem>
                ))}
            </Wrap>
          </VStack>
        </VStack>
      </DrawerBody>

      <DrawerFooter>
        <Button variant="outline" mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button
          colorScheme={'orange'}
          isLoading={saving}
          onClick={handleSubmit}
        >
          {currentMood ? 'Update' : 'Save'}
        </Button>
      </DrawerFooter>
    </>
  )
}
