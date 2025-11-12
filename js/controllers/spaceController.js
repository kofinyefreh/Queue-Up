import * as model from '../models/model.js';
import * as spaceModel from '../models/spaceModel.js';
import * as taskModel from '../models/taskModel.js';
import * as taskView from '../views/tasksView.js';
import * as addSpaceView from '../views/addSpaceView.js';
import * as selectSpaceView from '../views/selectSpaceView.js';
import * as tabView from '../views/tabsView.js';

console.log('Space Controller');

// //////////////////////////////////// Add Spaces
// Open Form
const openForm = function () {
  addSpaceView.openForm();
  const { valid, msg } = model.validateSpaceInput(
    addSpaceView.getInputValue(),
    25
  );
  addSpaceView.showValidation(valid, msg);
};

// Close Form
const closeForm = function () {
  addSpaceView.closeForm();
  addSpaceView.clearInput();
};

// Validate input while typing
const validateTypingInput = function (value) {
  const { valid, msg } = model.validateSpaceInput(value, 25);
  addSpaceView.showValidation(valid, msg);
};

// Add new Space
const addNewSpace = function () {
  const newSpace = addSpaceView.getInputValue();
  const { valid } = model.validateSpaceInput(newSpace, 25);

  if (!valid) return;
  const success = spaceModel.addNewSpace(newSpace);

  if (!success) {
    alert(`${newSpace} already exists!`);
    addSpaceView.openForm();
    return;
  }
  // updateSpaces
  addSpaceView.renderAddedSpaces(success, model.state.tasks);
  addSpaceView.clearInput();
  addSpaceView.closeForm();

  // ******************8 taskView **********************
  taskView.renderTasks(taskModel.getSelectedTasks());

  // ****************** tabView **********************
  tabView.showSpaceTitle(model.state.selectedSpace);
  tabView.defaultTab();
  tabView.countAll();
  tabView.countPending();
  tabView.countCompleted();
  tabView.countArchived();
};

// Select Space
const selectSpaceController = function (clicked) {
  selectSpaceView.updateSelection(clicked);
  spaceModel.setSelectedSpace(clicked);
  tabView.showSpaceTitle(model.state.selectedSpace);

  // ******************8 taskView **********************
  taskView.renderTasks(taskModel.getAllTasks());
  tabView.defaultTab();
  tabView.countAll(taskModel.getAllTasks());
  tabView.countPending(taskModel.getPendingTasks());
  tabView.countCompleted(taskModel.getCompletedTasks());
  tabView.countArchived(taskModel.getArchivedTasks());
};

export function initSpaces() {
  addSpaceView.renderAddedSpaces(model.state.spaces, model.state.tasks);
  addSpaceView.onOpenForm(openForm);
  addSpaceView.onCloseForm(closeForm);
  addSpaceView.onAddSpace(addNewSpace);
  addSpaceView.onInput(validateTypingInput);
  selectSpaceView.addSelectSpace(selectSpaceController);
}
