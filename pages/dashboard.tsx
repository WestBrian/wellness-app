import Head from 'next/head'
import type { FC } from 'react'
import { RequireAuth } from '../src/components/RequireAuth'
import { Dashboard } from '../src/pages/Dashboard'

const DashboardPage: FC = () => {
  return (
    <>
      <Head>
        <title>Mood Tracker | Dashboard</title>
      </Head>
      <main>
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      </main>
    </>
  )
}

export default DashboardPage
