import * as help from '../helpers.js';

const spaceTitle = document.querySelector('.space-title');
const tabs = document.querySelector('.tabs');
const [all, pending, completed, archived] =
  document.querySelectorAll('.tab-num');

// Display Space Name view
export function showSpaceTitle(selected) {
  spaceTitle.textContent = '';
  spaceTitle.textContent = help.capitalize(selected);
}

// Edit Space Name View
export function editSpaceTitle(handler) {
  let oldSpaceName;

  spaceTitle.addEventListener('click', function () {
    oldSpaceName = help.capitalize(spaceTitle.textContent.trim());
  });

  spaceTitle.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();

      const newSpaceName = help.capitalize(e.target.textContent.trim());
      spaceTitle.textContent = help.capitalize(newSpaceName);

      if (newSpaceName === oldSpaceName) {
        spaceTitle.blur();
        spaceTitle.textContent = oldSpaceName;
        return;
      }
      handler(oldSpaceName, newSpaceName);
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
