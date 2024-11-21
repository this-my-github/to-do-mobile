import { URL } from '@/constants/url'

export const updateTask = async (
	userId,
	taskId,
	title,
	description,
	status
) => {
	return fetch(`${URL}/tasks/${taskId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({
			title,
			description,
			status,
			userId
		})
	}).then(loadedTask => loadedTask.json())
}
