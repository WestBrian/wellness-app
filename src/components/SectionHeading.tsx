import { Heading } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'

export interface SectionHeadingProps {
  children: ReactNode
}

export const SectionHeadingLarge: FC<SectionHeadingProps> = ({ children }) => {
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

export interface SectionHeadingSmallProps {
  children: ReactNode
}

export const SectionHeadingSmall: FC<SectionHeadingSmallProps> = ({
  children,
}) => {
  return (
    <Heading
      as={'h2'}
      fontSize={'xs'}
      fontWeight={'semibold'}
      color={'gray.500'}
      letterSpacing={'wide'}
      textTransform={'uppercase'}
    >
      {children}
    </Heading>
  )
}
