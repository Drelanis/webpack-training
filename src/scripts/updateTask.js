import { getItem, getDate, setItem } from './storage.js';
import { renderTasks } from './renderer.js';
import { deleteTask, getTasksList, updateTask } from './tasksGateway.js';

export const tasksToDo = event => {
  if (event.target.classList.value === 'list__item_delete-btn') {
    const idTask = event.target.closest('.list__item').dataset.id;
    deleteTask(idTask)
      .then(() => getTasksList())
      .then(newTasksList => {
        setItem('tasksList', newTasksList);
        renderTasks();
      });
  }
  if (event.target.getAttribute('type') !== 'checkbox') {
    return;
  }
  const tasksList = getItem('tasksList');
  const { text } = tasksList.find(task => task.id === event.target.dataset.id);
  const done = event.target.checked;

  const updatedTask = {
    text,
    done,
    finishDate: done ? getDate() : null,
  };

  const taskId = event.target.dataset.id;

  updateTask(taskId, updatedTask)
    .then(() => getTasksList())
    .then(newTasksList => {
      setItem('tasksList', newTasksList);
      renderTasks();
    });
};
