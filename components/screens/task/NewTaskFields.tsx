import { FC } from 'react'
import { Control } from 'react-hook-form'
import { Field } from '@/components/ui'
import { ITaskFormData } from '@/types/taskform.interface'

interface ITaskFormFields {
	control: Control<ITaskFormData>
}

export const NewTaskFields: FC<ITaskFormFields> = ({ control }) => {
	return (
		<>
			<Field<ITaskFormData>
				placeholder='Enter title'
				control={control}
				name={'title'}
				className='py-8'
				rules={{
					required: 'Title is required!',
					minLength: {
						value: 3,
						message: 'Title should be minimum 3 characters long '
					},
					maxLength: {
						value: 15,
						message: 'Title should be maximum 15 characters long '
					}
				}}
			/>
			<Field<ITaskFormData>
				placeholder='Enter description'
				control={control}
				name={'description'}
				multiline={true}
				numberOfLines={4}
				rules={{
					required: 'Description is required!',
					minLength: {
						value: 3,
						message: 'Description should be minimum 3 characters long '
					},
					maxLength: {
						value: 40,
						message: 'Description should be maximum 40 characters long '
					}
				}}
			/>
		</>
	)
}
