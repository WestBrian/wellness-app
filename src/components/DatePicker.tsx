import type { FC } from 'react'
import { Text, HStack, Icon, IconButton } from '@chakra-ui/react'
import RightArrow from '../../public/angle-right.svg'
import LeftArrow from '../../public/angle-left.svg'
import { format, addDays } from 'date-fns'

export interface DatePickerProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

export const DatePicker: FC<DatePickerProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <HStack w={'full'} spacing={4} justify={'center'}>
      <IconButton
        variant={'ghost'}
        icon={<Icon as={LeftArrow} />}
        aria-label={'Previous day'}
        onClick={() => setSelectedDate(addDays(selectedDate, -1))}
      />
      <Text fontWeight={'bold'} letterSpacing={'wider'}>
        {format(selectedDate, 'MM/dd')}
      </Text>
      <IconButton
        variant={'ghost'}
        icon={<Icon as={RightArrow} />}
        aria-label={'Next day'}
        onClick={() => setSelectedDate(addDays(selectedDate, 1))}
      />
    </HStack>
  )
}
