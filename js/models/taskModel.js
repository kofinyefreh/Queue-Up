import * as model from './model.js';
console.log('nice one');

///////////////////////////////////////////////////////////////////
// Add tasks
export function addNewTask(newTask) {
  // if (!model.state.spaces.length) return alert('create spaces first');
  const selectedArray = model.state.tasks.filter(
    item => item.space === model.state.selectedSpace
  );
  const exists = selectedArray.some(task => task.taskName === newTask);
  if (exists) return false;

  model.state.tasks.unshift({
    id: 0,
    taskName: newTask,
    time: new Date(),
    archived: false,
    completed: true,
    space: model.state.selectedSpace.toLowerCase(),
    edited: true,
  });

  return model.state.tasks;
}

///////////////////////////////////////////////////////////////////
// Get Selected Tasks
export function getSelectedTasks() {
  return model.state.tasks.filter(
    item => item.space === model.state.selectedSpace
  );
}

///////////////////////////////////////////////////////////////////
// Edit Space Name
export function editeSpaceName(newName) {
  const spacesArray = model.state.spaces.find(
    item => item.space === model.state.selectedSpace
  );
  const tasksArray = model.state.tasks.filter(
    item => item.space === model.state.selectedSpace
  );

  spacesArray.space = newName.toLowerCase();
  tasksArray.forEach(task => (task.space = newName.toLowerCase()));
  model.state.selectedSpace = newName.toLowerCase();
}

///////////////////////////////////////////////////////////////////
// Task Actions
// export function completeTask(taskName) {
//   const activeTask = model.state.tasks.filter(
//     item =>
//       item.taskName === taskName && item.space === model.state.selectedSpace
//   );
//   activeTask.completed = true;
// }

// export function archivedTask(taskName) {
//   const activeTask = model.state.tasks.filter(
//     item =>
//       item.taskName === taskName && item.space === model.state.selectedSpace
//   );
//   activeTask.archived = true;
// }

export function activateTaskProperty(taskName, property) {
  const activeTask = model.state.tasks.filter(
    item =>
      item.taskName === taskName && item.space === model.state.selectedSpace
  );
  activeTask[property] = true;
}

///////////////////////////////////////////////////////////////////
// Get selected Item = 'all' default
export function getAllTasks(arr) {
  const list = arr.filter(item => !item.completed && !item.archived);
  return { list, listNum: list.length };
}

// Get pending task
export function getPendingTasks(arr) {
  const list = arr.filter(
    item => !item.completed || (item.archived && !item.completed)
  );
  return { list, listNum: list.length };
}

// Get completed Task
export function getCompletedTasks(arr) {
  const list = arr.filter(item => item.completed);
  return { list, listNum: list.length };
}

// Get Archived Task
export function getArchivedTasks(arr) {
  const list = arr.filter(item => item.archived);
  return { list, listNum: list.length };
}
