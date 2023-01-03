import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        h: 'full',
      },
      body: {
        WebkitTapHighlightColor: 'transparent',
      },
    },
  },
})
