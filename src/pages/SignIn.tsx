import { FC, useEffect } from 'react'
import { VStack, Heading, Text, Button, Icon } from '@chakra-ui/react'
import GoogleLogo from '../../public/google.svg'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'

const googleProvider = new GoogleAuthProvider()

export interface SignInProps {}

export const SignIn: FC<SignInProps> = ({}) => {
  const router = useRouter()
  const [user] = useAuthState(auth)

  const login = () => {
    signInWithPopup(auth, googleProvider)
  }

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

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
