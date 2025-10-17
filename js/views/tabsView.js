import * as help from '../helpers.js';

const tasksTitle = document.querySelector('.space-title');
const tabs = document.querySelector('.tabs');
const [all, pending, completed, archived] =
  document.querySelectorAll('.tab-num');

// Display Space Name view
export function showSpaceTitle(selected) {
  tasksTitle.textContent = '';
  tasksTitle.textContent = help.capitalize(selected);
}

// Edit Space Name View
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

export function selectTab(handler) {
  tabs.addEventListener('click', function (e) {
    // Remove old selection
    document
      .querySelectorAll('.tab')
      .forEach(item => item.classList.remove('selected-tab'));

    // Add selection to current
    const tab = e.target.closest('.tab');
    tab.classList.add('selected-tab');

    handler(tab.dataset.tab);
  });
}

// Default selection
export function defaultTab() {
  document
    .querySelectorAll('.tab')
    .forEach(item => item.classList.remove('selected-tab'));

  // Add selection to "all" tab
  const tabAll = document.querySelector('.tab');
  tabAll.classList.add('selected-tab');
}

// Count tabs Num
export function countAll(tasks) {
  if (!tasks) {
    all.textContent = 0;
    return;
  }
  all.textContent = tasks.length;
}

export function countPending(tasks) {
  if (!tasks) {
    pending.textContent = 0;
    return;
  }
  pending.textContent = tasks.length;
}

export function countCompleted(tasks) {
  if (!tasks) {
    completed.textContent = 0;
    return;
  }
  completed.textContent = tasks.length;
}

export function countArchived(tasks) {
  if (!tasks) {
    archived.textContent = 0;
    return;
  }
  archived.textContent = tasks.length;
}
