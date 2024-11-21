import { Button } from '@/components/ui'
import { FC, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { AuthFields } from './AuthFields'

import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthFormData } from '@/types/auth.interface'
import { Loader } from '@/components/ui'
import { DismissKeyboard } from './DismissKeyboard'
import { login } from '@/api/login'
import { useAuth } from '@/hooks/useAuth'
import { register } from '@/api/register'

export const Auth: FC = () => {
	const { handleSubmit, reset, control } = useForm<IAuthFormData>({
		mode: 'onChange'
	})

	const { setUserId } = useAuth()

	const onSubmitHandler: SubmitHandler<IAuthFormData> = ({
		email,
		password
	}) => {
		isReg
			? register(email, password).then(userId => {
					setUserId(userId)
				})
			: login(email, password).then(userId => {
					setUserId(userId)
				})
		reset()
	}

	const [isReg, setIsReg] = useState(false)

	const isLoading = false

	return (
		<DismissKeyboard>
			<View className='mx-2 justify-center items-center h-full'>
				<View className='w-9/12'>
					<Text className='text-center text-white text-4xl font-bold mb-2.5'>
						{isReg ? 'Register' : 'Login'}
					</Text>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<AuthFields control={control} isPassRequired />
							<Button onPress={handleSubmit(onSubmitHandler)} icon={'list'}>
								<Text>Go to do</Text>
							</Button>
							<Pressable onPress={() => setIsReg(!isReg)}>
								<Text className='text-white opacity-30 text-right text-base mt-3'>
									{isReg ? 'Login' : 'Register'}
								</Text>
							</Pressable>
						</>
					)}
				</View>
			</View>
		</DismissKeyboard>
	)
}
