import { Button } from '@/components/ui'
import { FC, useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { Picker as SelectPicker } from '@react-native-picker/picker'
import { Loader } from '@/components/ui'
import { Task } from './Task'
import { getTasks } from '@/api'
import { getUserId } from '@/api/store-token'

interface ITask {
	id: number
	title: string
	description: string
	status: boolean
}

export const HomeScreen: FC<{ navigation: any }> = ({ navigation }) => {
	const [tasks, setTasks] = useState<ITask[]>([])
	const [userId, setUserId] = useState<string | null>(null)
	const [selectedValue, setSelectedValue] = useState('all')
	const [isSorting, setIsSorting] = useState(false)
	const isLoading = false

	useEffect(() => {
		const fetchData = async () => {
			try {
				const id = await getUserId()
				setUserId(id)
				if (id) {
					const fetchedTasks = await getTasks(id, isSorting)
					setTasks(fetchedTasks)
				}
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			}
		}

		fetchData()
	}, [isSorting])

	const filteredTasks = tasks.filter(task => {
		if (selectedValue === 'done') return task.status
		if (selectedValue === 'not') return !task.status
		return true
	})

	const renderEmptyState = () => (
		<>
			<Text className='text-center text-white text-3xl mt-14 mb-8'>
				Ещё нет задач, добавьте первую
			</Text>
			<Button
				className='mt-0'
				onPress={() => navigation.navigate('TaskScreen', { tasks, setTasks })}
				icon={'plus'}
			>
				<Text>Add</Text>
			</Button>
		</>
	)

	const renderFilterAndSortButtons = () => (
		<View className='flex-row justify-end items-center mt-6 mb-4 gap-4'>
			<SelectPicker
				style={{
					height: 50,
					width: 110,
					backgroundColor: '#DC3F41',
					color: 'white',
					textAlign: 'center',
					fontWeight: '500',
					alignItems: 'center'
				}}
				selectedValue={selectedValue}
				onValueChange={itemValue => setSelectedValue(itemValue)}
			>
				<SelectPicker.Item label='All' value='all' />
				<SelectPicker.Item label='Done' value='done' />
				<SelectPicker.Item label='Not' value='not' />
			</SelectPicker>
			<Button
				className='mt-0'
				onPress={() => setIsSorting(!isSorting)}
				icon={'arrow-up'}
			>
				<Text>Sort</Text>
			</Button>
			<Button
				className='mt-0'
				onPress={() => navigation.navigate('TaskScreen', { tasks, setTasks })}
				icon={'plus'}
			>
				<Text>Add</Text>
			</Button>
		</View>
	)

	return (
		<View className='mx-2 justify-center items-center h-full'>
			<View className='w-10/12'>
				<Text className='text-center text-white text-4xl font-bold mb-2.5'>
					{'To-do'}
				</Text>

				{isLoading ? (
					<Loader />
				) : tasks.length === 0 ? (
					renderEmptyState()
				) : (
					<>
						{renderFilterAndSortButtons()}
						<FlatList
							data={filteredTasks}
							keyExtractor={item => item.id.toString()}
							renderItem={({ item }) => (
								<Task
									{...item}
									onPress={() =>
										navigation.navigate('TaskScreen', {
											taskId: item.id,
											tasks,
											setTasks
										})
									}
									tasks={tasks}
									setTasks={setTasks}
								/>
							)}
						/>
					</>
				)}
			</View>
		</View>
	)
}
