import { extendTheme } from '@chakra-ui/react'
import { Poppins } from '@next/font/google'

const font = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: font.style.fontFamily,
        WebkitTapHighlightColor: 'transparent',
      },
    },
  },
  textStyles: {
    h2: {
      fontSize: 'sm',
      fontWeight: 'bold',
      color: 'gray.700',
      letterSpacing: 'wide',
      textTransform: 'uppercase',
    },
  },
})
