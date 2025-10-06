import * as model from './model.js';
console.log('nice one');

///////////////////////////////////////////////////////////////////
// Add tasks
export function addNewTask(newTask) {
  const selectedArray = model.state.tasks.filter(
    item => item.space === model.state.selectedSpace.selectSpace
  );
  const exists = selectedArray.some(task => task.taskName === newTask);
  if (exists) return false;

  model.state.tasks.unshift({
    id: 0,
    taskName: newTask,
    time: new Date(),
    archived: false,
    completed: false,
    space: model.state.selectedSpace.selectSpace.toLowerCase(),
    edited: false,
  });

  return model.state.tasks;
}

///////////////////////////////////////////////////////////////////
// Get Selected Tasks
export function getSelectedTasks() {
  return model.state.tasks.filter(
    item => item.space === model.state.selectedSpace.selectSpace
  );
}

///////////////////////////////////////////////////////////////////
// Edit Space Name
export function editeSpaceNameList(newName) {
  if (newName.length > 25 || newName.length === 0) {
    alert(`"${newName}" is too long!`);
    return;
  }
  const spacesArray = model.state.spaces.find(
    item => item.space === model.state.selectedSpace.selectSpace
  );
  const tasksArray = model.state.tasks.filter(
    item => item.space === model.state.selectedSpace.selectSpace
  );

  spacesArray.space = newName.toLowerCase();
  tasksArray.forEach(task => (task.space = newName.toLowerCase()));
  model.state.selectedSpace.selectSpace = newName.toLowerCase();
}

///////////////////////////////////////////////////////////////////
// Task Actions

export function activateTaskProperty(taskName, property) {
  const activeTask = model.state.tasks.find(
    item =>
      item.taskName === taskName && item.space === model.state.selectedSpace
  );

  if (activeTask) activeTask[property] = !activeTask[property];
  return activeTask;
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
