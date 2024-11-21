import AsyncStorage from '@react-native-async-storage/async-storage'
import { storeToken } from './store-token'
import { URL } from '@/constants/url'

export const register = async (email, password) => {
	try {
		const response = await fetch(`${URL}/register`, {
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
			await AsyncStorage.setItem('userId', data.user.id)
			return data.user.id
		} else {
			throw new Error(data.message || 'Ошибка при входе')
		}
	} catch (error) {
		console.error('Ошибка аутентификации:', error)
	}
}
