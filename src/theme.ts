import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      // 'html, body': {
      //   h: 'full',
      // },
      body: {
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
