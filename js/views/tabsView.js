import * as help from '../helpers.js';

const tasksTitle = document.querySelector('.space-title');

export function showSpaceTitle(selected) {
  tasksTitle.textContent = '';
  tasksTitle.textContent = help.capitalize(selected);
}

export function editedSpaceName(handler) {
  tasksTitle.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newName = tasksTitle.textContent.trim();
      tasksTitle.textContent = help.capitalize(newName);
      handler(newName);
    }
  });
}
