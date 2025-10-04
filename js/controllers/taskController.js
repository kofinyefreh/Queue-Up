import * as model from '../models/model.js';
import * as taskModel from '../models/taskModel.js';
import * as tasksView from '../views/tasksView.js';
import * as addTaskView from '../views/addTaskView.js';
import * as spaceView from '../views/spaceView.js';
import * as tabView from '../views/tabsView.js';

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
  // if (!model.state.spaces.length) return;

  const newTask = addTaskView.getInputValue();
  const { valid } = model.validateInput(newTask, 250);
  if (!valid) return;

  const success = taskModel.addNewTask(newTask);
  if (!success) {
    alert(`${newTask} already exists!`);
    addTaskView.openForm();
    return;
  }
  tasksView.renderTasks(taskModel.getSelectedTasks());

  // **************************** Space View **************************
  spaceView.renderSpaces(model.state.spaces, model.state.tasks);

  addTaskView.clearInput();
  addTaskView.closeForm();
};

// Edit space name from tasks pane
const changeSpaceName = function (newName) {
  taskModel.editeSpaceName(newName);
  tasksView.renderTasks(taskModel.getSelectedTasks());

  // ************* space View ***********************
  console.log(model.state.selectedSpace);
  spaceView.renderSpaces(model.state.spaces, model.state.tasks);

  // console.log(taskModel.getSelectedTasks());
};

export function initTasks() {
  tasksView.renderTasks(taskModel.getSelectedTasks());
  addTaskView.onOpenForm(openForm);
  addTaskView.onCloseForm(closeForm);
  addTaskView.onAddTask(addTask);
  addTaskView.onInput(validateTypingInput);
  tabView.editedSpaceName(changeSpaceName);
}
