import express from 'express';
import path from 'path';
import { Container } from './Core/Container';
import { SqliteTaskRepository } from './Infra/SqliteTaskRepository';
import { TaskService } from './App/TaskService';
import { taskStatusFromString } from './Domain/TaskStatus';

const app = express();
const port = process.env.PORT || 3000;

// 1. Ініціалізація Контейнера
const container = new Container();

// 2. Налаштування залежностей
container.set('TaskRepository', () => {
    return new SqliteTaskRepository(path.join(__dirname, '../data/app.sqlite'));
});

container.set('TaskService', (c) => {
    return new TaskService(c.get('TaskRepository'));
});

// Налаштування Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Ендпоінти
app.get('/', (req, res) => {
    try {
        const service = container.get<TaskService>('TaskService');
        const tasks = service.all();
        res.render('index', { tasks, error: null });
    } catch (err: any) {
        res.render('index', { tasks: [], error: err.message });
    }
});

app.post('/add', (req, res) => {
    try {
        const { title, description, priority, due_date } = req.body;
        const service = container.get<TaskService>('TaskService');
        service.create(
            (title || '').trim(),
            (description || '').trim(),
            parseInt(priority) || 3,
            (due_date || '').trim()
        );
        res.redirect('/');
    } catch (err: any) {
        const service = container.get<TaskService>('TaskService');
        const tasks = service.all();
        res.render('index', { tasks, error: err.message });
    }
});

app.post('/status', (req, res) => {
    try {
        const { id, status } = req.body;
        const service = container.get<TaskService>('TaskService');
        service.changeStatus(parseInt(id), taskStatusFromString(status));
        res.redirect('/');
    } catch (err: any) {
        const service = container.get<TaskService>('TaskService');
        const tasks = service.all();
        res.render('index', { tasks, error: err.message });
    }
});

app.post('/delete', (req, res) => {
    try {
        const { id } = req.body;
        const service = container.get<TaskService>('TaskService');
        service.remove(parseInt(id));
        res.redirect('/');
    } catch (err: any) {
        const service = container.get<TaskService>('TaskService');
        const tasks = service.all();
        res.render('index', { tasks, error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
