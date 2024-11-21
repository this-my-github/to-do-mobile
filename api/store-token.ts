import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeToken = async token => {
	try {
		await AsyncStorage.setItem('accessToken', token)
	} catch (e) {
		console.error('Ошибка при сохранении токена:', e)
	}
}

export const getToken = async () => {
	try {
		const token = await AsyncStorage.getItem('accessToken')
		return token
	} catch (error) {
		console.error('Ошибка при получении токена:', error)
	}
}

export const getUserId = async () => {
	try {
		const userId = await AsyncStorage.getItem('userId')
		return userId
	} catch (error) {
		console.error('Ошибка при получении userId:', error)
	}
}

export const removeToken = async () => {
	try {
		await AsyncStorage.removeItem('accessToken')
	} catch (error) {
		console.error('Ошибка при удалении токена:', error)
	}
}
