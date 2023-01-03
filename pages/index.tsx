import Head from 'next/head'
import { Dashboard } from '../src/pages/Dashboard'

export default function Home() {
  return (
    <>
      <Head>
        <title>Wellness</title>
        <meta
          name="description"
          content="Our wellness app helps you prioritize and maintain your physical, mental, and emotional health with mood and healthy habit tracking"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Dashboard />
      </main>
    </>
  )
}
