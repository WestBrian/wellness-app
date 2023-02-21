import type { FC } from 'react'
import { IconButton, Box, Icon } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { useRouter } from 'next/router'
import AngleLeft from '../../public/svgs/angle-left.svg'

export interface NavbarProps {}

export const Navbar: FC<NavbarProps> = ({}) => {
  const [user] = useAuthState(auth)
  const router = useRouter()

  if (router.pathname === '/') {
    return null
  }

  return (
    <Box
      w={'full'}
      position={'fixed'}
      top={4}
      left={4}
      bg={'transparent'}
      zIndex={10}
    >
      <IconButton
        variant={'ghost'}
        icon={<Icon as={AngleLeft} />}
        bg={'white'}
        rounded={'full'}
        shadow={'lg'}
        aria-label={'back'}
        onClick={router.back}
      />
    </Box>
  )
}
