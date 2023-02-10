import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import type { FC } from 'react'
import { RequireAuth } from '../src/components/RequireAuth'
import { Home, HomeProps } from '../src/pages/Home'
import { DailyQuoteResponse } from '../src/types'
import { customFetch } from '../src/utils/customFetch'

const HomePage: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  dailyQuote,
}) => {
  return (
    <>
      <Head>
        <title>Mood Tracker | Home</title>
      </Head>
      <main>
        <RequireAuth>
          <Home dailyQuote={dailyQuote} />
        </RequireAuth>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const quoteResponse = await customFetch<DailyQuoteResponse>(
    'https://zenquotes.io/api/today/'
  )

  return {
    props: {
      dailyQuote: quoteResponse[0],
    },
    revalidate: 86400 /* 1 day */,
  }
}

export default HomePage
