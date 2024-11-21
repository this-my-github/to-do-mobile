import { FC } from 'react'
import { ActivityIndicator } from 'react-native'

export const Loader: FC = () => {
	return <ActivityIndicator size={'large'} color={'#BF3335'} />
}
