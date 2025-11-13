import * as model from './model.js';
import * as help from '../helpers.js';

console.log('Space Model');

// Add Spaces
export function addNewSpace(newSpace) {
  const exists = model.state.spaces.some(
    space => space.name.toLowerCase() === newSpace.toLowerCase()
  );
  if (exists) return false;

  model.state.spaces.push({
    name: help.capitalize(newSpace),
    time: Date.now(),
  });
  model.state.selectedSpace = help.capitalize(newSpace);
  model.setLocalStorage();
  return model.state.spaces;
}

// Set selected space
export function setSelectedSpace(DOMel) {
  const spaceNameEl = DOMel.querySelector('.space--name');
  model.state.selectedSpace = spaceNameEl.textContent;
  model.setLocalStorage();
}
