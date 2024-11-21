import { URL } from '@/constants/url'

export const addTask = async (userId, title, description) => {
	return fetch(`${URL}/tasks`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({
			title,
			description,
			status: false,
			userId
		})
	}).then(createdTask => createdTask.json())
}
