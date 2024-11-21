import { FC } from 'react'
import { Control } from 'react-hook-form'
import { IAuthFormData } from '@/types/auth.interface'
import { Field } from '@/components/ui'
import { validEmail } from '@/types/regex'

interface IAuthFields {
	control: Control<IAuthFormData>
	isPassRequired?: boolean
}

export const AuthFields: FC<IAuthFields> = ({ control, isPassRequired }) => {
	return (
		<>
			<Field<IAuthFormData>
				placeholder='Enter email'
				control={control}
				name={'email'}
				rules={{
					required: 'Email is required!',
					pattern: {
						value: validEmail,
						message: 'Please enter a valid email address'
					}
				}}
				keyboardType='email-address'
			/>
			<Field<IAuthFormData>
				placeholder='Enter password'
				control={control}
				name={'password'}
				rules={
					isPassRequired
						? {
								required: 'Password is required!',
								minLength: {
									value: 6,
									message: 'Password should be minimum 6 characters long '
								}
							}
						: {}
				}
				keyboardType='email-address'
			/>
		</>
	)
}
