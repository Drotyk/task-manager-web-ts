import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { ITaskRepository } from "../Ports/ITaskRepository";
import { Task } from "../Domain/Task";
import { TaskStatus, taskStatusFromString } from "../Domain/TaskStatus";

export class SqliteTaskRepository implements ITaskRepository {
    private db: Database.Database;

    constructor(dbPath: string) {
        const dir = path.dirname(dbPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        this.db = new Database(dbPath);
        this.db.pragma('journal_mode = WAL');

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS tasks(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              description TEXT NOT NULL DEFAULT '',
              status TEXT NOT NULL,
              priority INTEGER NOT NULL,
              due_date TEXT NOT NULL DEFAULT ''
            );
        `);
    }

    public add(title: string, description: string, priority: number, dueDate: string): number {
        const stmt = this.db.prepare(
            "INSERT INTO tasks(title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?)"
        );
        const result = stmt.run(title, description, TaskStatus.TODO, priority, dueDate);
        return result.lastInsertRowid as number;
    }

    public all(): Task[] {
        const rows = this.db.prepare("SELECT * FROM tasks ORDER BY id DESC").all() as any[];
        return rows.map(r => new Task(
            r.id,
            r.title,
            r.description,
            taskStatusFromString(r.status),
            r.priority,
            r.due_date
        ));
    }

    public setStatus(id: number, status: TaskStatus): void {
        const stmt = this.db.prepare("UPDATE tasks SET status = ? WHERE id = ?");
        const result = stmt.run(status, id);

        if (result.changes === 0) {
            // Check if task exists
            const check = this.db.prepare("SELECT 1 FROM tasks WHERE id = ?").get(id);
            if (!check) {
                throw new Error("Task not found");
            }
        }
    }

    public remove(id: number): void {
        const stmt = this.db.prepare("DELETE FROM tasks WHERE id = ?");
        const result = stmt.run(id);
        if (result.changes === 0) {
            throw new Error("Task not found");
        }
    }
}
