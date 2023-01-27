import Head from 'next/head'
import { RequireAuth } from '../src/components/RequireAuth'
import { Dashboard } from '../src/pages/Dashboard'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Mood Tracker | Home</title>
      </Head>
      <main>
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      </main>
    </>
  )
}
