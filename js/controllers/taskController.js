import * as model from '../models/model.js';
import * as taskModel from '../models/taskModel.js';
import * as tasksView from '../views/tasksView.js';
import * as addTaskView from '../views/addTaskView.js';
import * as spaceView from '../views/spaceView.js';
import * as tabView from '../views/tabsView.js';
import * as taskActionsView from '../views/taskActionsView.js';

// Open Form
const openForm = function () {
  addTaskView.openForm();
  const { valid, msg } = model.validateInput(addTaskView.getInputValue(), 250);
  addTaskView.showValidation(valid, msg);
};

// Close Form
const closeForm = function () {
  addTaskView.closeForm();
  addTaskView.clearInput();
};

// Validate input while typing
const validateTypingInput = function (value) {
  const { valid, msg } = model.validateInput(value, 250);
  addTaskView.showValidation(valid, msg);
};

// Add new task
const addTask = function () {
  const newTask = addTaskView.getInputValue();
  const { valid } = model.validateInput(newTask, 250);
  if (!valid) return;

  const success = taskModel.addNewTask(newTask);
  if (!success) {
    alert(`${newTask} already exists!`);
    addTaskView.openForm();
    return;
  }

  tasksView.renderTasks(taskModel.getAllTasks());
  tabView.countAll(taskModel.getAllTasks());
  tabView.countPending(taskModel.getPendingTasks());
  tabView.countCompleted(taskModel.getCompletedTasks());
  tabView.countArchived(taskModel.getArchivedTasks());
  tabView.defaultTab();

  addTaskView.clearInput();
  addTaskView.closeForm();

  // **************************** Space View **************************
  spaceView.renderSpaces(model.state.spaces, model.state.tasks);
};

// Edit space name from tasks pane
const changeSpaceName = function (newName) {
  taskModel.editeSpaceNameList(newName);

  tasksView.renderTasks(taskModel.getAllTasks());
  tabView.countAll(taskModel.getAllTasks());
  tabView.countPending(taskModel.getPendingTasks());
  tabView.countCompleted(taskModel.getCompletedTasks());
  tabView.countArchived(taskModel.getArchivedTasks());
  tabView.defaultTab();

  // ************* space View ***********************
  spaceView.renderSpaces(model.state.spaces, model.state.tasks);
};

// Select tab
const selectTab = function () {
  tabView.selectTab(tab => {
    taskModel.activeTab(tab);

    if (tab === 'all') tasksView.renderTasks(taskModel.getAllTasks());
    else if (tab === 'pending')
      tasksView.renderTasks(taskModel.getPendingTasks());
    else if (tab === 'completed')
      tasksView.renderTasks(taskModel.getCompletedTasks());
    else if (tab === 'archived')
      tasksView.renderTasks(taskModel.getArchivedTasks());
  });
};
selectTab();

///////////////////////////////////////////////////////////////
// task actions
// ---- Mark as completed and Uncompleted
taskActionsView.markAsComplete((taskName, action) => {
  const completedState = taskModel.activateTaskProperty(taskName, action);
  if (!completedState) tasksView.renderTasks(taskModel.getCompletedTasks());
  else tasksView.renderTasks(taskModel.getAllTasks());

  tabView.countAll(taskModel.getAllTasks());
  tabView.countPending(taskModel.getPendingTasks());
  tabView.countCompleted(taskModel.getCompletedTasks());
  tabView.countArchived(taskModel.getArchivedTasks());
  console.log(selectedTab);
});

taskActionsView.markAsArchived((taskName, action) => {
  const archivedState = taskModel.activateTaskProperty(taskName, action);
  if (!archivedState) tasksView.renderTasks(taskModel.getArchivedTasks());
  else tasksView.renderTasks(taskModel.getAllTasks());

  tabView.countAll(taskModel.getAllTasks());
  tabView.countPending(taskModel.getPendingTasks());
  tabView.countCompleted(taskModel.getCompletedTasks());
  tabView.countArchived(taskModel.getArchivedTasks());
});

export function initTasks() {
  tasksView.renderTasks(taskModel.getSelectedTasks());
  addTaskView.onOpenForm(openForm);
  addTaskView.onCloseForm(closeForm);
  addTaskView.onAddTask(addTask);
  addTaskView.onInput(validateTypingInput);
  tabView.editedSpaceName(changeSpaceName);
}
