import * as model from './model.js';

console.log('Space Model');

// Add Spaces
export function addNewSpace(newSpace) {
  const exists = model.state.spaces.some(space => space.space === newSpace);
  if (exists) return false;

  model.state.spaces.push({ space: newSpace.toLowerCase(), time: new Date() });
  model.state.selectedSpace = {
    selectSpace: newSpace.toLowerCase(),
    displaySelected: newSpace,
  };
  return model.state.spaces;
}

// Set selected space
export function setSelectedSpace(DOMel) {
  const spaceNameEl = DOMel.querySelector('.space--name');
  model.state.selectedSpace = {
    selectSpace: spaceNameEl.textContent.toLowerCase(),
    displaySelected: spaceNameEl.textContent,
  };
}

// Update Spaces
// export function updateSelectedSpace(selectedSpace) {
//   return model.state.tasks.filter(item => item.taskName === selectedSpace);
// }
