import * as model from './model.js';
import * as help from '../helpers.js';
console.log('nice one');

///////////////////////////////////////////////////////////////////
// Add tasks
export function addNewTask(newTask) {
  const selectedArray = model.state.tasks.filter(
    item => item.space === model.state.selectedSpace
  );
  const exists = selectedArray.some(
    task => task.taskName === help.capitalizeTask(newTask)
  );
  if (exists) return false;

  model.state.tasks.unshift({
    id: 0,
    taskName: help.capitalizeTask(newTask),
    time: new Date(),
    archived: false,
    completed: false,
    space: model.state.selectedSpace,
    edited: false,
  });

  model.state.selectedTab = 'all';
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
export function editeSpaceNameList(newName) {
  const trimmed = help.capitalize(newName.trim());
  if (trimmed.length > 25 || trimmed.length === 0) {
    alert(`"${trimmed}" is an invalid name!`);
    return;
  }
  const spacesArray = model.state.spaces.find(
    item => item.space === model.state.selectedSpace
  );
  const tasksArray = model.state.tasks.filter(
    item => item.space === model.state.selectedSpace
  );

  spacesArray.space = help.capitalize(newName);
  tasksArray.forEach(task => (task.space = trimmed));
  model.state.selectedSpace = trimmed;
}

///////////////////////////////////////////////////////////////////
// Select task tab
export function activeTab(selecedTab) {
  model.state.selectedTab = selecedTab;
}

///////////////////////////////////////////////////////////////////
// Get selected Item = 'all' default
export function getAllTasks() {
  const selectedArray = getSelectedTasks();
  const allList = selectedArray.filter(
    item => !item.completed && !item.archived
  );
  return allList;
}

// Get pending task
export function getPendingTasks() {
  const selectedArray = getSelectedTasks();
  const pendingList = selectedArray.filter(item => !item.completed);
  return pendingList;
}

// Get completed Task
export function getCompletedTasks() {
  const selectedArray = getSelectedTasks();
  const completedList = selectedArray.filter(item => item.completed);
  return completedList;
}

// Get Archived Task
export function getArchivedTasks() {
  const selectedArray = getSelectedTasks();
  const archivedList = selectedArray.filter(
    item => !item.completed && item.archived
  );
  return archivedList;
}

///////////////////////////////////////////////////////////////////
// Task Actions

export function activateTaskProperty(taskName, property) {
  const activeTask = model.state.tasks.find(
    item =>
      item.taskName === taskName && item.space === model.state.selectedSpace
  );

  if (activeTask) activeTask[property] = !activeTask[property];
  return activeTask[property];
}
