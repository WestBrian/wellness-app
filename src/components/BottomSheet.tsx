import { Drawer, DrawerOverlay, DrawerContent } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'

export interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const BottomSheet: FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Drawer isOpen={isOpen} placement={'bottom'} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent roundedTop={'2xl'}>{children}</DrawerContent>
    </Drawer>
  )
}
