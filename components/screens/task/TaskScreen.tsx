import { Button } from '@/components/ui'
import { FC, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Loader } from '@/components/ui'
import { addTask, getTask, updateTask } from '@/api'
import { DismissKeyboard } from '../Auth/DismissKeyboard'
import { NewTaskFields } from './NewTaskFields'
import { ITaskFormData } from '@/types/taskform.interface'
import { setTaskInTasks } from '@/utils/set-task-in-tasks'
import { getUserId } from '@/api/store-token'

export const TaskScreen: FC<{ route: any; navigation: any }> = ({
	route,
	navigation
}) => {
	const taskId = route.params?.taskId || ''
	const tasks = route.params?.tasks
	const setTasks = route.params?.setTasks

	const [task, setTask] = useState({})
	const [userId, setUserId] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const id = await getUserId()
				setUserId(id)
				if (id) {
					const taskData = await getTask(taskId)
					setTask(taskData)
					reset({
						title: taskData.title,
						description: taskData.description
					})
				}
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			}
		}

		fetchData()
	}, [taskId])

	const { handleSubmit, reset, control } = useForm<ITaskFormData>({
		mode: 'onChange'
	})

	const onSubmitHandler: SubmitHandler<ITaskFormData> = async ({
		title,
		description
	}) => {
		if (taskId) {
			await updateTask(userId, taskId, title, description, task.status)
			setTasks(setTaskInTasks(tasks, { id: taskId, title, description }))
		} else {
			const newTask = await addTask(userId, title, description)
			setTasks([newTask, ...tasks])
		}
		navigation.goBack()
	}

	const isLoading = false

	return (
		<DismissKeyboard>
			<View className='mx-2 justify-center items-center h-full'>
				<View className='w-9/12'>
					<Text className='text-center text-white text-4xl font-bold mb-2.5'>
						{taskId ? 'Edit To-do' : 'Create To-do'}
					</Text>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<NewTaskFields control={control} />
							<View className='flex-row items-center justify-center gap-4'>
								<Button onPress={() => navigation.goBack()}>
									<Text>Cancel</Text>
								</Button>
								<Button onPress={handleSubmit(onSubmitHandler)}>
									<Text>Save</Text>
								</Button>
							</View>
						</>
					)}
				</View>
			</View>
		</DismissKeyboard>
	)
}
