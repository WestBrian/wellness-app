import type { FC } from 'react'
import { VStack, HStack, Button, Heading, Box } from '@chakra-ui/react'
import CryIcon from '../../public/cry.svg'
import SadIcon from '../../public/sad.svg'
import ExpressionlessIcon from '../../public/expressionless.svg'
import SmileIcon from '../../public/smile.svg'
import ExcitedIcon from '../../public/excited.svg'
import Image from 'next/image'
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { User } from 'firebase/auth'
import { isSameDay } from 'date-fns'
import { MoodConverter } from '../converters/mood-converter'

const iconSize = 50

const moods: { mood: string; icon: any }[] = [
  {
    mood: 'awful',
    icon: CryIcon,
  },
  {
    mood: 'bad',
    icon: SadIcon,
  },
  {
    mood: 'decent',
    icon: ExpressionlessIcon,
  },
  {
    mood: 'happy',
    icon: SmileIcon,
  },
  {
    mood: 'overjoyed',
    icon: ExcitedIcon,
  },
]

interface MoodButtonProps {
  mood: string
  icon: any
  isSelected: boolean
  onClick: () => void
}

const MoodButton: FC<MoodButtonProps> = ({
  mood,
  icon,
  isSelected,
  onClick,
}) => {
  return (
    <Button
      variant={'solid'}
      bg={isSelected ? 'orange.300' : 'orange.100'}
      shadow={'sm'}
      w={`${iconSize + 25}px`}
      h={`${iconSize + 25}px`}
      _hover={{
        bg: 'orange.300',
      }}
      _focus={{
        outline: 'none',
        boxShadow: 'none',
        borderWidth: '3px',
        borderColor: 'orange.200',
      }}
      _active={{
        bg: 'orange.300',
      }}
      aria-label={mood}
      onClick={onClick}
    >
      <Box
        w={`${iconSize}px`}
        h={`${iconSize}px`}
        minW={`${iconSize}px`}
        minH={`${iconSize}px`}
      >
        <Image src={icon} width={iconSize} height={iconSize} alt={mood} />
      </Box>
    </Button>
  )
}

export interface MoodTrackerProps {
  user: User
}

export const MoodTracker: FC<MoodTrackerProps> = ({ user }) => {
  const moodRef = collection(db, `users/${user.uid}/moods`).withConverter(
    MoodConverter
  )
  const [moodData] = useCollectionData(query(moodRef))
  const now = new Date()
  const currentMood = moodData?.find((mood) => isSameDay(mood.date, now))

  const saveMood = async (mood: number) => {
    if (currentMood) {
      updateDoc(doc(db, moodRef.path, currentMood.id), {
        mood,
        date: serverTimestamp(),
      })
    } else {
      addDoc(moodRef, {
        id: '-1',
        mood,
        date: serverTimestamp(),
      })
    }
  }

  return (
    <VStack w={'full'} align={'start'} spacing={2}>
      <Heading
        size={'xs'}
        fontWeight={'extrabold'}
        letterSpacing={'wide'}
        textTransform={'uppercase'}
        color={'gray.600'}
      >
        Mood
      </Heading>
      <HStack
        w={'full'}
        spacing={2}
        overflowX={'scroll'}
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {moods.map((mood, index) => (
          <Box key={mood.mood}>
            <MoodButton
              {...mood}
              isSelected={currentMood?.mood === index + 1}
              onClick={() => saveMood(index + 1)}
            />
          </Box>
        ))}
      </HStack>
    </VStack>
  )
}
