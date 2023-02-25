import {
  HStack,
  VStack,
  Text,
  StackDivider,
  Flex,
  IconButton,
  Icon,
  Input,
} from '@chakra-ui/react'
import { FC, useState, Fragment } from 'react'
import { SectionHeadingLarge } from '../components/SectionHeading'
import { useActivities } from '../hooks/useActivities'
import type { ActivityData } from '../types/activity'
import PencilIcon from '../../public/svgs/pencil.svg'
import TrashIcon from '../../public/svgs/trash.svg'
import PlusIcon from '../../public/svgs/plus.svg'
import CheckIcon from '../../public/svgs/check.svg'
import TimesIcon from '../../public/svgs/times.svg'
import { AnimatePresence, motion } from 'framer-motion'
import { FramerBox } from '../components/FramerBox'
import { doc, collection, updateDoc, addDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import type { User } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

interface ActivityBoxProps {
  activity: ActivityData
  user: User
}

const ActivityBox: FC<ActivityBoxProps> = ({ activity, user }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(activity.activity)

  const save = () => {
    const activityDoc = doc(db, `users/${user.uid}/activities/${activity.id}`)
    updateDoc(activityDoc, {
      activity: value,
    })
    setIsEditing(false)
  }

  const disable = () => {
    const activityDoc = doc(db, `users/${user.uid}/activities/${activity.id}`)
    updateDoc(activityDoc, {
      enabled: false,
    })
  }

  return (
    <Flex w={'full'} p={2} justify={'space-between'} align={'center'}>
      <AnimatePresence mode={'wait'}>
        {isEditing ? (
          <Fragment key={'edit'}>
            <Input
              as={motion.input}
              value={value}
              mr={4}
              initial={'hidden'}
              animate={'visible'}
              exit={'hidden'}
              variants={{
                hidden: {
                  opacity: 0,
                  x: -25,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              onChange={(e) => setValue(e.target.value)}
            />
            <HStack>
              <IconButton
                icon={<Icon as={CheckIcon} fill={'white'} />}
                aria-label={'Save'}
                colorScheme={'green'}
                onClick={save}
              />
              <IconButton
                icon={<Icon as={TimesIcon} />}
                aria-label={'Cancel'}
                onClick={() => setIsEditing(false)}
              />
            </HStack>
          </Fragment>
        ) : (
          <Fragment key={'detail'}>
            <Text
              as={motion.p}
              initial={'hidden'}
              animate={'visible'}
              exit={'hidden'}
              variants={{
                hidden: {
                  opacity: 0,
                  x: -25,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
            >
              {activity.activity}
            </Text>
            <HStack>
              <IconButton
                icon={<Icon as={PencilIcon} />}
                aria-label={'Edit'}
                onClick={() => setIsEditing(true)}
              />
              <IconButton
                icon={<Icon as={TrashIcon} fill={'white'} />}
                colorScheme={'red'}
                aria-label={'Delete'}
                onClick={disable}
              />
            </HStack>
          </Fragment>
        )}
      </AnimatePresence>
    </Flex>
  )
}

interface NewActivityBoxProps {
  user: User
  close: () => void
}

const NewActivityBox: FC<NewActivityBoxProps> = ({ user, close }) => {
  const [value, setValue] = useState('')

  const save = () => {
    const activityCol = collection(db, `users/${user.uid}/activities`)
    addDoc(activityCol, {
      activity: value,
      enabled: true,
    })
    close()
  }

  return (
    <Flex w={'full'} p={2} justify={'space-between'} align={'center'}>
      <Input value={value} mr={4} onChange={(e) => setValue(e.target.value)} />
      <HStack>
        <IconButton
          icon={<Icon as={CheckIcon} fill={'white'} />}
          aria-label={'Save'}
          colorScheme={'green'}
          onClick={save}
        />
        <IconButton
          icon={<Icon as={TimesIcon} />}
          aria-label={'Cancel'}
          onClick={close}
        />
      </HStack>
    </Flex>
  )
}

export interface UserActivitiesProps {}

export const UserActivities: FC<UserActivitiesProps> = ({}) => {
  const [activities] = useActivities()
  const [addNew, setAddNew] = useState(false)
  const [user] = useAuthState(auth)

  return (
    <VStack w={'full'} align={'start'} spacing={4}>
      <Flex w={'full'} justify={'space-between'} align={'center'}>
        <SectionHeadingLarge>My Activities</SectionHeadingLarge>
        <IconButton
          icon={<Icon as={PlusIcon} />}
          aria-label={'Add'}
          onClick={() => setAddNew(true)}
        />
      </Flex>
      <VStack w={'full'} align={'start'} divider={<StackDivider />}>
        <AnimatePresence mode={'popLayout'}>
          {addNew && (
            <FramerBox w={'full'} layout>
              <NewActivityBox user={user!} close={() => setAddNew(false)} />
            </FramerBox>
          )}
          {activities
            ?.filter((a) => a.enabled)
            .map((activity) => (
              <FramerBox key={activity.id} w={'full'} layout>
                <ActivityBox activity={activity} user={user!} />
              </FramerBox>
            ))}
        </AnimatePresence>
      </VStack>
    </VStack>
  )
}
