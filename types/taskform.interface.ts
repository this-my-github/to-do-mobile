import { ITask } from './task.interface'

export interface ITaskFormData extends Pick<ITask, 'title' | 'description'> {}
