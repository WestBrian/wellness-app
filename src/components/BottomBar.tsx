import type { FC } from 'react'
import { Box, Flex, IconButton, Icon, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import HomeIcon from '../../public/svgs/home.svg'
import ChartIcon from '../../public/svgs/chart-area.svg'
import UserIcon from '../../public/svgs/user.svg'
import PlusIcon from '../../public/svgs/plus.svg'
import { BottomSheet } from './BottomSheet'
import { MoodForm } from './MoodForm'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

interface NavButtonProps {
  href: string
  icon: any
  label: string
}

const NavButton: FC<NavButtonProps> = ({ href, icon, label }) => {
  return (
    <Link href={href}>
      <IconButton
        as={'div'}
        variant={'ghost'}
        colorScheme={'orange'}
        rounded={'full'}
        icon={<Icon as={icon} boxSize={6} fill={'orange.300'} />}
        aria-label={label}
      />
    </Link>
  )
}

export interface BottomBarProps {}

export const BottomBar: FC<BottomBarProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [user] = useAuthState(auth)

  if (!user) {
    return null
  }

  return (
    <Box position={'fixed'} bottom={8} w={'full'} px={4}>
      <Box
        bg={'orange.100'}
        w={'full'}
        px={4}
        py={3}
        rounded={'full'}
        shadow={'lg'}
      >
        <Flex justify={'space-between'} align={'center'} w={'full'} h={'full'}>
          <NavButton href={'/'} icon={HomeIcon} label={'Home'} />
          <NavButton href={'/dashboard'} icon={ChartIcon} label={'Dashboard'} />
          <NavButton href={'/account'} icon={UserIcon} label={'User'} />
          <IconButton
            variant={'ghost'}
            colorScheme={'orange'}
            rounded={'full'}
            icon={<Icon as={PlusIcon} boxSize={6} fill={'orange.300'} />}
            aria-label={'Add mood'}
            onClick={onOpen}
          />
        </Flex>
      </Box>
      <BottomSheet isOpen={isOpen} onClose={onClose}>
        <MoodForm onClose={onClose} />
      </BottomSheet>
    </Box>
  )
}
