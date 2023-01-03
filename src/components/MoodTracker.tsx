import type { FC } from 'react'
import { VStack, HStack, Button, Heading, Box } from '@chakra-ui/react'
import CryIcon from '../../public/cry.svg'
import SadIcon from '../../public/sad.svg'
import ExpressionlessIcon from '../../public/expressionless.svg'
import SmileIcon from '../../public/smile.svg'
import ExcitedIcon from '../../public/excited.svg'
import Image from 'next/image'

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
}

const MoodButton: FC<MoodButtonProps> = ({ mood, icon }) => {
  return (
    <Button
      variant={'solid'}
      bg={'orange.100'}
      shadow={'sm'}
      w={`${iconSize + 25}px`}
      h={`${iconSize + 25}px`}
      _hover={{
        bg: 'orange.200',
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

export interface MoodTrackerProps {}

export const MoodTracker: FC<MoodTrackerProps> = ({}) => {
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
        {moods.map((mood) => (
          <Box key={mood.mood}>
            <MoodButton {...mood} />
          </Box>
        ))}
      </HStack>
    </VStack>
  )
}
