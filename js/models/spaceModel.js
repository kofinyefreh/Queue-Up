import * as model from './model.js';
import * as help from '../helpers.js';

console.log('Space Model');

// Add Spaces
export function addNewSpace(newSpace) {
  const exists = model.state.spaces.some(
    space => space.space.toLowerCase() === newSpace.toLowerCase()
  );
  if (exists) return false;

  model.state.spaces.push({
    space: help.capitalize(newSpace),
    time: new Date(),
  });
  model.state.selectedSpace = help.capitalize(newSpace);
  console.log(model.state.spaces);
  return model.state.spaces;
}

// Set selected space
export function setSelectedSpace(DOMel) {
  const spaceNameEl = DOMel.querySelector('.space--name');
  model.state.selectedSpace = spaceNameEl.textContent;
}

// Update Spaces
// export function updateSelectedSpace(selectedSpace) {
//   return model.state.tasks.filter(item => item.taskName === selectedSpace);
// }
