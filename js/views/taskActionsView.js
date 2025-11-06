import * as help from '../helpers.js';

const taskList = document.querySelector('.task-list');

export function markAsComplete(handler) {
  // Select DomEl
  taskList.addEventListener('click', function (e) {
    if (!e.target.closest('.done')) return;

    const item = e.target.closest('.left');
    const taskName = item.querySelector('.task-name');
    const completedIcon = item.querySelector('.done');

    handler(taskName.textContent.trim(), 'completed');
  });
}

export function markAsArchived(handler) {
  // Select DomEl
  taskList.addEventListener('click', function (e) {
    if (!e.target.classList.contains('archive')) return;

    const taskItem = e.target.closest('.task');
    const taskName = taskItem.querySelector('.task-name');
    const archiveIcon = taskItem.querySelector('.archive');
    console.log(archiveIcon);

    handler(taskName.textContent.trim(), 'archived');
  });
}

export function deleteTask(handler) {
  taskList.addEventListener('click', function (e) {
    if (!e.target.classList.contains('delete')) return;

    const taskItem = e.target.closest('.task');
    const taskName = taskItem.querySelector('.task-name');
    const deleteIcon = taskItem.querySelector('.delete');

    handler(taskName.textContent.trim());
  });
}

// Editing a task
export function editTask(handler) {
  taskList.addEventListener('click', function (e) {
    if (!e.target.classList.contains('task-name')) return;

    const selectedTask = e.target;
    const oldTaskName = selectedTask.textContent.trim();

    selectedTask.addEventListener('keydown', function (event) {
      console.log(`we're in`);
      if (event.key === 'Enter') {
        event.preventDefault();

        const newTaskName = help.capitalizeTask(
          event.target.textContent.trim()
        );

        if (oldTaskName === newTaskName) {
          selectedTask.blur();
          selectedTask.textContent = oldTaskName;
          return;
        }

        handler(oldTaskName, newTaskName);
      }
    });
  });

  // if (!selectedTask) return;
}
