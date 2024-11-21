import { ComponentType } from 'react'

export type TypeRootStackParamList = {
	Auth: undefined
	HomeScreen: undefined
	TaskScreen: undefined
	Screen404: undefined
}

export interface IRoute {
	name: keyof TypeRootStackParamList
	component: ComponentType
}
