import type { FC } from 'react'
import { VStack, Button, Heading, Text } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../src/firebase'
import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth'

const provider = new GoogleAuthProvider()

const login = () => {
  signInWithPopup(auth, provider)
}

const logout = () => {
  signOut(auth)
}

export interface SignInProps {}

const SignIn: FC<SignInProps> = ({}) => {
  const [user] = useAuthState(auth)

  return (
    <VStack align={'start'} spacing={8}>
      <VStack align={'start'} spacing={2}>
        <Heading
          size={'xs'}
          fontWeight={'extrabold'}
          letterSpacing={'widest'}
          textTransform={'uppercase'}
          color={'gray.600'}
        >
          Sign In
        </Heading>
        <Text lineHeight={'7'}>
          Welcome to Wellness! Please sign in to access your account and all of
          the features and benefits that come with it. Thank you for choosing
          us, and we hope you have a great experience on our app.
        </Text>
      </VStack>
      <Text fontSize={'sm'} fontWeight={'semibold'}>
        {user ? user.email : 'No user found'}
      </Text>
      {!user && <Button onClick={login}>Sign in with Google</Button>}
      {user && <Button onClick={logout}>Sign out</Button>}
    </VStack>
  )
}

export default SignIn
