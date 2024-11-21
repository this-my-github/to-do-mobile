import { TypeFeatherIconNames } from '@/types/icons.types'
import { PressableProps } from 'react-native'

export interface IButton extends PressableProps {
	className?: string
	classNameGradient?: string
	icon?: TypeFeatherIconNames
}
