import type { AppProps } from 'next/app'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { theme } from '../src/theme'
import { Navbar } from '../src/components/Navbar'
import { BottomBar } from '../src/components/BottomBar'
import { Inter } from '@next/font/google'

import '../src/firebase'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box className={inter.className}>
        <Navbar />
        <Box as={'main'} p={4} mt={'74px'}>
          <Component {...pageProps} />
        </Box>
        <BottomBar />
      </Box>
    </ChakraProvider>
  )
}
