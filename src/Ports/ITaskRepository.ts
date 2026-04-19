import { Task } from "../Domain/Task";
import { TaskStatus } from "../Domain/TaskStatus";

export interface ITaskRepository {
    add(title: string, description: string, priority: number, dueDate: string): number;
    all(): Task[];
    setStatus(id: number, status: TaskStatus): void;
    remove(id: number): void;
}
