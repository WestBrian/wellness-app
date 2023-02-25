import {
  FC,
  ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
} from 'react'
import { IconButton, Box, Icon, Text, Flex } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { RouterEvent, useRouter } from 'next/router'
import { FramerBox } from './FramerBox'
import { AnimatePresence, motion } from 'framer-motion'
import AngleLeftIcon from '../../public/svgs/angle-left.svg'
import PlusIcon from '../../public/svgs/plus.svg'

type IconType = 'plus'

const icons: { [x: string]: any } = {
  plus: PlusIcon,
}

interface NavbarContextValues {
  title: string
  setTitle: (title: string) => void
  icon: IconType | null
  setIcon: (icon: IconType) => void
  actionLabel: string
  setActionLabel: (actionLabel: string) => void
  onActionClick: () => void
  setOnActionClick: (callback: () => void) => void
  showBackButton: boolean
  setShowBackButton: (show: boolean) => void
}

const NavbarContext = createContext<NavbarContextValues>({
  title: '',
  setTitle: () => {},
  icon: null,
  setIcon: () => {},
  actionLabel: '',
  setActionLabel: () => {},
  onActionClick: () => {},
  setOnActionClick: () => {},
  showBackButton: false,
  setShowBackButton: () => {},
})

export const NavbarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [icon, setIcon] = useState<any>(null)
  const [actionLabel, setActionLabel] = useState<string>('')
  const [onActionClick, setOnActionClick] = useState<() => void>(() => {})
  const [showBackButton, setShowBackButton] = useState(router.pathname !== '/')

  useEffect(() => {
    const handleRouteChange = (pathname: string) => {
      setIcon(null)
      setActionLabel('')
      setOnActionClick(() => {})
      setShowBackButton(pathname !== '/')
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events])

  return (
    <NavbarContext.Provider
      value={{
        title,
        setTitle,
        icon,
        setIcon,
        actionLabel,
        setActionLabel,
        onActionClick,
        setOnActionClick,
        showBackButton,
        setShowBackButton,
      }}
    >
      {children}
    </NavbarContext.Provider>
  )
}

export const useNavbar = () => useContext(NavbarContext)

export interface NavbarProps {}

export const Navbar: FC<NavbarProps> = ({}) => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const { title, icon, actionLabel, onActionClick, showBackButton } =
    useNavbar()

  if (!user) {
    return null
  }

  return (
    <FramerBox
      position={'fixed'}
      top={0}
      left={0}
      right={0}
      h={'56px'}
      bg={'white'}
      shadow={'sm'}
      px={4}
      py={2}
      zIndex={10}
    >
      <Flex w={'full'} h={'full'} align={'center'} justify={'space-between'}>
        <Box w={'full'}>
          <AnimatePresence>
            {showBackButton && (
              <IconButton
                as={motion.button}
                initial={{ x: -10, opacity: 0, rotate: -45 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                exit={{ x: -10, opacity: 0, rotate: -45 }}
                icon={<Icon as={AngleLeftIcon} />}
                variant={'ghost'}
                aria-label={'Go back'}
                onClick={router.back}
              />
            )}
          </AnimatePresence>
        </Box>
        <Box w={'full'} textAlign={'center'}>
          <Text
            fontSize={'md'}
            fontWeight={'semibold'}
            letterSpacing={'wide'}
            whiteSpace={'nowrap'}
          >
            {title || 'Hello'}
          </Text>
        </Box>
        <Flex w={'full'} justify={'end'}>
          <AnimatePresence>
            {icon && actionLabel && (
              <IconButton
                key={actionLabel}
                as={motion.button}
                initial={{ x: 10, opacity: 0, rotate: 45 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                exit={{ x: 10, opacity: 0, rotate: 45 }}
                icon={<Icon as={icons[icon]} />}
                variant={'ghost'}
                aria-label={actionLabel}
                onClick={onActionClick}
              />
            )}
          </AnimatePresence>
        </Flex>
      </Flex>
    </FramerBox>
  )
}
