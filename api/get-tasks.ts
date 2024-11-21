import { URL } from '@/constants/url'

export const getTasks = async (userId, isAlphabetSorting = false) => {
	let url = `${URL}/tasks`
	const sortingParams = isAlphabetSorting
		? '_sort=title&_order=asc'
		: '_sort=id&_order=desc'

	url += `?userId=${userId}&${sortingParams}`

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		}
	})
	const loadedTasks = await response.json()
	return loadedTasks
}
