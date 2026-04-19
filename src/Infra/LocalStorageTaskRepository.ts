import { ITaskRepository } from "../Ports/ITaskRepository";
import { Task } from "../Domain/Task";
import { TaskStatus } from "../Domain/TaskStatus";

export class LocalStorageTaskRepository implements ITaskRepository {
    private readonly STORAGE_KEY = 'tasks_data';

    public add(title: string, description: string, priority: number, dueDate: string): number {
        const tasks = this.getAllFromStorage();
        const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
        
        const newTask: Task = {
            id,
            title,
            description,
            status: TaskStatus.TODO,
            priority,
            dueDate
        };

        tasks.push(newTask);
        this.save(tasks);
        return id;
    }

    public all(): Task[] {
        return this.getAllFromStorage().sort((a, b) => b.id - a.id);
    }

    public setStatus(id: number, status: TaskStatus): void {
        const tasks = this.getAllFromStorage();
        const index = tasks.findIndex(t => t.id === id);
        if (index === -1) throw new Error("Task not found");
        
        tasks[index] = { ...tasks[index], status };
        this.save(tasks);
    }

    public remove(id: number): void {
        const tasks = this.getAllFromStorage();
        const filtered = tasks.filter(t => t.id !== id);
        if (filtered.length === tasks.length) throw new Error("Task not found");
        
        this.save(filtered);
    }

    private getAllFromStorage(): Task[] {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (!data) return [];
        try {
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    private save(tasks: Task[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    }
}
