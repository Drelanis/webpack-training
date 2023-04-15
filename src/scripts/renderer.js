import { createCheckboxElement } from './createCheckbox.js';
import { getItem } from './storage.js';

export const renderTasks = () => {
  const listElement = document.querySelector('.list');
  listElement.innerHTML = '';
  const tasksElems = (getItem('tasksList') || [])
    .sort((first, second) => first.done - second.done || second.date - first.date)
    .map(({ text, done, id }) => {
      const listItemElem = document.createElement('li');
      listItemElem.setAttribute('data-id', id);

      listItemElem.classList.add('list__item');
      if (done) {
        listItemElem.classList.add('list__item_done');
      }

      const checkboxElement = createCheckboxElement(done, id);

      const textElem = document.createElement('span');
      textElem.classList.add('list__item_text');
      textElem.textContent = text;

      const deleteBtnElement = document.createElement('button');
      deleteBtnElement.classList.add('list__item_delete-btn');
      deleteBtnElement.textContent = '+';
      deleteBtnElement.setAttribute('data-id', id);

      listItemElem.append(checkboxElement, textElem, deleteBtnElement);
      return listItemElem;
    });
  listElement.append(...tasksElems);
};
