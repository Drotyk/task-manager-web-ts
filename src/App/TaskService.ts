import { ITaskRepository } from "../Ports/ITaskRepository";
import { Task } from "../Domain/Task";
import { TaskStatus } from "../Domain/TaskStatus";

export class TaskService {
    constructor(private readonly repo: ITaskRepository) {}

    public create(title: string, description: string, priority: number, dueDate: string): number {
        if (!title.trim()) {
            throw new Error("Title is empty");
        }
        if (priority < 1 || priority > 5) {
            throw new Error("Priority must be 1..5");
        }
        return this.repo.add(title, description, priority, dueDate);
    }

    public all(): Task[] {
        return this.repo.all();
    }

    public changeStatus(id: number, status: TaskStatus): void {
        if (id <= 0) {
            throw new Error("Bad id");
        }
        this.repo.setStatus(id, status);
    }

    public remove(id: number): void {
        if (id <= 0) {
            throw new Error("Bad id");
        }
        this.repo.remove(id);
    }
}
