import { VStack, Text, Flex, Box, Link } from '@chakra-ui/react'
import type { FC } from 'react'
import { useSortedActivities } from '../hooks/useSortedActivities'
import type { MoodData } from '../types/mood'
import { getMoodEmoji } from '../utils/getMoodEmoji'
import { moodToFraction } from '../utils/moodToFraction'
import { toPercent } from '../utils/toPercent'
import { SectionHeadingSmall } from './SectionHeading'
import NextLink from 'next/link'

export interface TopActivitiesProps {
  moods: MoodData[]
}

export const TopActivities: FC<TopActivitiesProps> = ({ moods }) => {
  const sortedActivities = useSortedActivities(moods)

  return (
    <VStack w={'full'} align={'start'} spacing={2}>
      <Flex w={'full'} justify={'space-between'} align={'center'}>
        <SectionHeadingSmall>
          Top{' '}
          {sortedActivities && sortedActivities.length > 3
            ? '3'
            : sortedActivities?.length}{' '}
          Activities
        </SectionHeadingSmall>
        <Link
          as={NextLink}
          href={'/activities'}
          color={'blue.500'}
          fontSize={'xs'}
          fontWeight={'semibold'}
        >
          More details
        </Link>
      </Flex>
      {sortedActivities && (
        <VStack w={'full'} align={'start'}>
          {sortedActivities.slice(0, 3).map((data) => (
            <Flex
              key={data.activity.id}
              w={'full'}
              justify={'space-between'}
              align={'center'}
              p={2}
              bg={'gray.100'}
              rounded={'md'}
            >
              <VStack spacing={0} align={'start'}>
                <Text>{data.activity.activity}</Text>
                <Text fontSize={'xs'} color={'gray.500'}>
                  Selected {data.appeared}{' '}
                  {data.appeared > 1 ? 'times' : 'time'}
                </Text>
              </VStack>
              <Text
                fontSize={'sm'}
                fontWeight={'semibold'}
                textTransform={'uppercase'}
                color={'gray.500'}
              >
                Score:{' '}
                <Box as={'span'} fontWeight={'bold'} color={'gray.600'}>
                  {toPercent(moodToFraction(Math.ceil(data.average)))}
                </Box>
              </Text>
            </Flex>
          ))}
        </VStack>
      )}
    </VStack>
  )
}
