import { URL } from '@/constants/url'

export const getTask = async taskId => {
	return fetch(`${URL}/tasks/${taskId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		}
	})
		.then(res => {
			if (res.ok) {
				return res
			}

			const error =
				res.status === 404
					? 'Такая страница не существует'
					: 'Что-то пошло не так. Попробуйте ещё раз позднее'

			return Promise.reject(error)
		})
		.then(loadedTask => loadedTask.json())
		.then(loadedTask => loadedTask)
}
