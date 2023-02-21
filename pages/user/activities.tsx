import Head from 'next/head'
import type { FC } from 'react'
import { RequireAuth } from '../../src/components/RequireAuth'
import { UserActivities } from '../../src/pages/UserActivities'

export interface ActivitiesPageProps {}

const ActivitiesPage: FC<ActivitiesPageProps> = ({}) => {
  return (
    <>
      <Head>
        <title>Mood Tracker | Activities</title>
      </Head>
      <main>
        <RequireAuth>
          <UserActivities />
        </RequireAuth>
      </main>
    </>
  )
}

export default ActivitiesPage
