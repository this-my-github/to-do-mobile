import { IRoute } from './navigation.types'
import { HomeScreen } from '@/components/screens/home/HomeScreen'
import { TaskScreen } from '@/components/screens/task/TaskScreen'

export const routes: IRoute[] = [
	{
		name: 'HomeScreen',
		component: HomeScreen
	},
	{
		name: 'TaskScreen',
		component: TaskScreen
	}
]
