import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './public/styles.css'
import { Container } from './Core/Container'
import { LocalStorageTaskRepository } from './Infra/LocalStorageTaskRepository'
import { TaskService } from './App/TaskService'

// 1. Ініціалізація DI Контейнера
const container = new Container();

container.set('TaskRepository', () => new LocalStorageTaskRepository());
container.set('TaskService', (c) => new TaskService(c.get('TaskRepository')));

// 2. Рендеринг додатка
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App container={container} />
  </React.StrictMode>,
)
