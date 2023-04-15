import { setItem, getDate } from './storage.js';
import { renderTasks } from './renderer.js';
import { createTask, getTasksList } from './tasksGateway.js';

export const addNewTasks = () => {
  const inputTaskElement = document.querySelector('.todo-list__actions_task-input');
  const text = inputTaskElement.value;
  if (text === '') {
    return;
  }

  const newTasks = {
    text,
    done: false,
    createDate: getDate(),
  };

  createTask(newTasks)
    .then(() => getTasksList())
    .then(newTasksList => {
      setItem('tasksList', newTasksList);
      renderTasks();
    });
  inputTaskElement.value = '';
};
