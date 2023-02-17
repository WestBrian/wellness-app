import { Box, BoxProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export interface FramerBoxProps {}

export const FramerBox = motion<Omit<BoxProps, 'transition'>>(Box)
