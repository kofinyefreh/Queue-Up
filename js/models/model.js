import * as help from '../helpers.js';
console.log('Model.js');

export const state = {
  selectedSpace: null,
  selectedTab: 'all',
  selectedTask: null,
  spaces: [],
  tasks: [],
  profileName: 'User',
  accountDate: new Date(),
};

// validate input logic
export function validateSpaceInput(value, num) {
  const trimmed = value.trim().toLowerCase();
  if (trimmed.length === 0)
    return { valid: null, msg: `Not more than ${num} chars` };
  if (trimmed.length > num)
    return { valid: false, msg: `Should be <= ${num} chars` };
  if (state.spaces.some(item => item.name.toLowerCase() === trimmed))
    return { valid: false, msg: `${trimmed} already exits` };
  return { valid: true, msg: `Not more than ${num} chars` };
}

export function validateTaskInput(value, num) {
  let array = [];
  const trimmed = value.trim().toLowerCase();

  if (state.tasks.length) {
    array = state.tasks.filter(task => task.space === state.selectedSpace);
  }

  if (trimmed.length === 0)
    return { valid: null, msg: `Not more than ${num} chars` };
  if (trimmed.length > num)
    return { valid: false, msg: `Should be <= ${num} chars` };
  if (array.length && array.some(item => item.name.toLowerCase() === trimmed))
    return { valid: false, msg: `${trimmed} already exits` };
  return { valid: true, msg: `Not more than ${num} chars` };
}
