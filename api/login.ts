import AsyncStorage from '@react-native-async-storage/async-storage'
import { storeToken } from './store-token'
import { URL } from '@/constants/url'

export const login = async (email, password) => {
	try {
		const response = await fetch(`${URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		})

		const data = await response.json()

		if (response.ok) {
			await storeToken(data.accessToken)
			await AsyncStorage.setItem('userId', String(data.user.id))
			return String(data.user.id)
		} else {
			throw new Error(data.message || 'Ошибка при входе')
		}
	} catch (error) {
		console.error('Ошибка аутентификации:', error)
	}
}
