export const setTaskInTasks = (tasks, newTaskData) =>
	tasks.map(task =>
		task.id === newTaskData.id
			? {
					...task,
					...newTaskData
				}
			: task
	)
