import type { AppProps } from 'next/app'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { theme } from '../src/theme'
import { Navbar } from '../src/components/Navbar'
import { BottomBar } from '../src/components/BottomBar'
import { Inter } from '@next/font/google'
import Head from 'next/head'
import { PWALinks } from '../src/components/PWALinks'
import '../src/firebase'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <PWALinks />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Our wellness app helps you prioritize and maintain your physical, mental, and emotional health with mood and healthy habit tracking"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <Box className={inter.className}>
          <Navbar />
          <Box as={'main'} p={4} mt={'74px'}>
            <Component {...pageProps} />
          </Box>
          <BottomBar />
        </Box>
      </ChakraProvider>
    </>
  )
}
