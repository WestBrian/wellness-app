import { Heading } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'

export interface SectionHeadingProps {
  children: ReactNode
}

export const SectionHeading: FC<SectionHeadingProps> = ({ children }) => {
  return (
    <Heading
      as={'h2'}
      fontSize={'xl'}
      fontWeight={'bold'}
      color={'gray.700'}
      letterSpacing={'wide'}
    >
      {children}
    </Heading>
  )
}
