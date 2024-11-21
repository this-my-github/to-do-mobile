import { FC, useEffect, useState } from 'react'
import { Alert, Pressable, Text, View } from 'react-native'
import cn from 'clsx'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Button } from '@/components/ui'
import { deleteTask, updateTask } from '@/api'
import { ITask } from '@/types/task.interface'
import { getUserId } from '@/api/store-token'
import { setTaskInTasks } from '@/utils/set-task-in-tasks'

interface TaskProps extends ITask {
	onPress: () => void
	tasks: ITask[]
	setTasks: (tasks: ITask[]) => void
}

export const Task: FC<TaskProps> = ({
	id,
	title,
	description,
	status,
	onPress,
	tasks,
	setTasks
}) => {
	const [isChecked, setIsChecked] = useState<boolean>(status)
	const iconName = isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'

	const [userId, setUserId] = useState<string | null>(null)

	useEffect(() => {
		const fetchUserId = async () => {
			try {
				const id = await getUserId()
				setUserId(id)
			} catch (error) {
				console.error('Ошибка при получении userId:', error)
			}
		}

		fetchUserId()
	}, [])

	const onDelete = () => {
		Alert.alert(
			'Удалить',
			'Удалить задачу?',
			[
				{ text: 'Нет', onPress: () => {} },
				{ text: 'Да', onPress: confirmDelete }
			],
			{ cancelable: false }
		)
	}

	const confirmDelete = () => {
		deleteTask(id).then(() => setTasks(tasks.filter(task => task.id !== id)))
	}

	const onUpdate = () => {
		setIsChecked(!isChecked)
		updateTask(userId, id, title, description, !isChecked).then(() => {
			setTasks(setTaskInTasks(tasks, { id, status: !isChecked }))
		})
	}

	const renderText = (text: string, textClass: string) => (
		<Text
			className={cn('text-white', textClass, isChecked ? 'line-through' : '')}
		>
			{text}
		</Text>
	)

	return (
		<View className='bg-[#232323] w-full border rounded-lg pb-4 pt-2.5 px-4 my-1.5 flex-row justify-between'>
			<View className='flex-row w-8/12'>
				<Pressable
					className='items-center justify-center mr-3'
					onPress={onUpdate}
				>
					<MaterialCommunityIcons name={iconName} size={30} color='#f4f4f4' />
				</Pressable>
				<View className=' w-10/12'>
					{renderText(title, 'text-2xl')}
					{renderText(description, 'text-base')}
				</View>
			</View>

			<View className='flex-row'>
				<Button
					className='mr-2'
					classNameGradient='pl-3 pr-1'
					onPress={onPress}
					icon={'edit'}
				></Button>
				<Button
					classNameGradient='pl-3 pr-1'
					onPress={onDelete}
					icon={'trash'}
				></Button>
			</View>
		</View>
	)
}
