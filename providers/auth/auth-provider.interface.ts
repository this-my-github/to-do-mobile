import { Dispatch, SetStateAction } from 'react'

export interface IContext {
	userId: string
	setUserId: Dispatch<SetStateAction<string>>
	logout: Function
}
