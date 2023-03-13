import Head from 'next/head'
import type { FC } from 'react'
import { RequireAuth } from '../../src/components/RequireAuth'
import { ActivityInsights } from '../../src/pages/ActivityInsights'

const ActivityPage: FC = () => {
  return (
    <>
      <Head>
        <title>Mood Tracker | Activity Insights</title>
      </Head>
      <main>
        <RequireAuth>
          <ActivityInsights />
        </RequireAuth>
      </main>
    </>
  )
}

export default ActivityPage
