import { atom } from 'jotai'
import { startOfMonth } from 'date-fns'

export const monthAtom = atom(startOfMonth(new Date()))
