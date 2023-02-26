import Head from 'next/head'
import type { FC } from 'react'
import { RequireAuth } from '../src/components/RequireAuth'
import { Account } from '../src/pages/Account'

const AccountPage: FC = () => {
  return (
    <>
      <Head>
        <title>Mood Tracker | Account</title>
      </Head>
      <main>
        <RequireAuth>
          <Account />
        </RequireAuth>
      </main>
    </>
  )
}

export default AccountPage
