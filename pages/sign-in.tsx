import Head from 'next/head'
import type { FC } from 'react'
import { SignIn } from '../src/pages/SignIn'

export interface SignInProps {}

const SignInPage: FC<SignInProps> = ({}) => {
  return (
    <>
      <Head>
        <title>Mood Tracker | Sign In</title>
      </Head>
      <SignIn />
    </>
  )
}

export default SignInPage
