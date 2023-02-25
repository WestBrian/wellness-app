import type { AppProps } from 'next/app'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { theme } from '../src/theme'
import { Navbar, NavbarProvider } from '../src/components/Navbar'
import { BottomBar } from '../src/components/BottomBar'
import Head from 'next/head'
import { PWALinks } from '../src/components/PWALinks'
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js'
import '../src/firebase'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

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
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ChakraProvider theme={theme}>
        <NavbarProvider>
          <Box>
            <Navbar />
            <Box
              as={'main'}
              p={4}
              maxW={'container.md'}
              mx={'auto'}
              mt={'56px'}
              mb={'96px'}
            >
              <Component {...pageProps} />
            </Box>
            <BottomBar />
          </Box>
        </NavbarProvider>
      </ChakraProvider>
    </>
  )
}
