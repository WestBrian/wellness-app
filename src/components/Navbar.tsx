import type { FC } from 'react'
import {
  SimpleGrid,
  Text,
  IconButton,
  Avatar,
  Box,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import {
  ChevronLeftIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/20/solid'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut } from 'firebase/auth'

export interface NavbarProps {}

export const Navbar: FC<NavbarProps> = ({}) => {
  const [user] = useAuthState(auth)
  const router = useRouter()

  if (router.pathname === '/') {
    return null
  }

  return (
    <SimpleGrid
      as={'nav'}
      columns={3}
      w={'full'}
      h={'74px'}
      p={4}
      position={'fixed'}
      top={0}
      left={0}
      bg={'rgba(255, 255, 255, 0.25)'}
      shadow={'sm'}
      backdropFilter={'blur(4px)'}
      border={'1px solid rgba( 255, 255, 255, 0.18 )'}
    >
      <Flex justify={'start'}>
        {router.pathname !== '/' && (
          <IconButton
            variant={'ghost'}
            icon={<ChevronLeftIcon width={'24px'} />}
            aria-label={'back'}
            onClick={router.back}
          />
        )}
      </Flex>
      <Center>
        <Text
          fontSize={'md'}
          fontWeight={'extrabold'}
          textTransform={'uppercase'}
          letterSpacing={'wider'}
          bgGradient={'linear(to-l, orange.400, red.400)'}
          bgClip={'text'}
        >
          Wellness
        </Text>
      </Center>
      <Flex justify={'end'} align={'center'}>
        {user ? (
          <Menu>
            <MenuButton as={'button'}>
              <Avatar
                name={user.displayName || user.email || 'User'}
                src={user.photoURL || undefined}
                size={'sm'}
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => signOut(auth)}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link href={'/sign-in'}>
            <IconButton
              as={'div'}
              variant={'ghost'}
              icon={<ArrowRightOnRectangleIcon width={'24px'} />}
              aria-label={'back'}
            />
          </Link>
        )}
      </Flex>
    </SimpleGrid>
  )
}
