import { URL } from '@/constants/url'

export const deleteTask = async taskId =>
	fetch(`${URL}/tasks/${taskId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		}
	})
