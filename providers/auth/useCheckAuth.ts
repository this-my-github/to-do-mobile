import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { getToken, getUserId } from '@/api/store-token'

export const useCheckAuth = () => {
	const { setUserId } = useAuth()

	useEffect(() => {
		const checkAccessToken = async () => {
			try {
				const token = await getToken()
				if (token) {
					const id = await getUserId()
					setUserId(id)
				}
			} catch (error) {
				console.error('Ошибка при получении userId:', error)
			}
		}

		checkAccessToken()
	}, [])
}
