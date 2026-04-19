import React, { useState, useEffect } from 'react';
import { Task } from './Domain/Task';

const API_URL = 'http://localhost:3001/api/tasks';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(3);
  const [dueDate, setDueDate] = useState('');

  const refreshTasks = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Помилка завантаження');
      setTasks(await res.json());
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, priority, dueDate })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Помилка додавання');
      }
      setTitle(''); setDescription(''); setPriority(3); setDueDate('');
      setError(null);
      refreshTasks();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleChangeStatus = async (id: number, status: string) => {
    try {
      await fetch(`${API_URL}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      refreshTasks();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Видалити задачу?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      refreshTasks();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <main className="container">
      <header className="header">
        <h1>Task Manager (React + Postgres)</h1>
        <p className="muted">Fullstack demo: React → Express → Postgres</p>
      </header>

      {error && <div className="alert">{error}</div>}

      <section className="card">
        <h2>Додати задачу</h2>
        <form onSubmit={handleAdd} className="grid">
          <input placeholder="Назва" value={title} onChange={e => setTitle(e.target.value)} required />
          <input type="number" min="1" max="5" value={priority} onChange={e => setPriority(parseInt(e.target.value))} />
          <textarea className="span2" placeholder="Опис" value={description} onChange={e => setDescription(e.target.value)} rows={3} />
          <input placeholder="Дедлайн (YYYY-MM-DD)" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          <button className="btn" type="submit">Додати</button>
        </form>
      </section>

      <section className="card">
        <h2>Список задач</h2>
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Статус</th><th>Пріоритет</th><th>Назва</th><th>Дії</th></tr>
          </thead>
          <tbody>
            {tasks.map(t => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.status}</td>
                <td>{t.priority}</td>
                <td><strong>{t.title}</strong></td>
                <td className="actions">
                  <select value={t.status} onChange={e => handleChangeStatus(t.id, e.target.value)}>
                    <option>TODO</option><option>DOING</option><option>DONE</option>
                  </select>
                  <button className="btn danger" onClick={() => handleDelete(t.id)}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default App;
