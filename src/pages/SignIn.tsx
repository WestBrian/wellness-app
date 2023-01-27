import { FC } from 'react'
import { VStack, Heading, Text, Button, Icon } from '@chakra-ui/react'
import GoogleLogo from '../../public/svgs/google.svg'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../firebase'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, writeBatch, doc, getDocs } from 'firebase/firestore'
import { ActivityConverter } from '../converters/activity-converter'

const defaultActivities = [
  '🥚 Ate breakfast',
  '🛌 Well rested',
  '👨 Saw friends',
  '👨‍👩‍👦 Saw family',
  '🖥️ Worked on projects',
  '🏋️ Exercised',
  '💼 Worked',
  '🚬 Smoked',
  '🍺 Drank alcohol',
]

const googleProvider = new GoogleAuthProvider()

export interface SignInProps {}

export const SignIn: FC<SignInProps> = ({}) => {
  const router = useRouter()
  const [user] = useAuthState(auth)

  const login = async () => {
    const userCredentials = await signInWithPopup(auth, googleProvider)

    const activityCol = collection(
      db,
      `users/${userCredentials.user.uid}/activities`
    ).withConverter(ActivityConverter)
    const snapshot = await getDocs(activityCol)
    if (snapshot.empty) {
      const batch = writeBatch(db)
      defaultActivities.forEach((activity) => {
        batch.set(doc(activityCol), {
          id: '-1',
          activity,
          enabled: true,
        })
      })
      batch.commit()
    }

    router.push('/')
  }

  // useEffect(() => {
  //   if (user) {
  //     router.push('/')
  //   }
  // }, [user, router])

  return (
    <VStack w={'full'} align={'start'} spacing={8}>
      <VStack w={'full'} align={'start'} spacing={2}>
        <Heading
          size={'xs'}
          textTransform={'uppercase'}
          fontWeight={'bold'}
          letterSpacing={'wider'}
        >
          Sign In
        </Heading>
        <Text lineHeight={'7'} color={'gray.700'}>
          Welcome to Wellness! Please sign in to access your account and all of
          the features and benefits that come with it. Thank you for choosing
          us, and we hope you have a great experience on our app.
        </Text>
      </VStack>
      <Button
        w={'full'}
        colorScheme={'blue'}
        leftIcon={<Icon as={GoogleLogo} fill={'white'} />}
        onClick={login}
      >
        Sign In With Google
      </Button>
    </VStack>
  )
}
