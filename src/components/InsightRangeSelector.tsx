import { ButtonGroup, IconButton, Icon, Button } from '@chakra-ui/react'
import { addMonths, format } from 'date-fns'
import { FC } from 'react'
import AngleLeftIcon from '../../public/svgs/angle-left.svg'
import AngleRightIcon from '../../public/svgs/angle-right.svg'
import { useAtom } from 'jotai'
import { monthAtom } from '../store'

export interface InsightRangeSelectorProps {}

export const InsightRangeSelector: FC<InsightRangeSelectorProps> = ({}) => {
  const [date, setDate] = useAtom(monthAtom)

  return (
    <ButtonGroup variant={'outline'} isAttached>
      <IconButton
        icon={<Icon as={AngleLeftIcon} />}
        aria-label={'Previous'}
        onClick={() => setDate((d) => addMonths(d, -1))}
      />
      <Button>{format(date, 'MMM yyyy')}</Button>
      <IconButton
        icon={<Icon as={AngleRightIcon} />}
        aria-label={'Next'}
        onClick={() => setDate((d) => addMonths(d, 1))}
      />
    </ButtonGroup>
  )
}
