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
    time: new Date(),
  });
  model.state.selectedSpace = help.capitalize(newSpace);
  return model.state.spaces;
}

// Set selected space
export function setSelectedSpace(DOMel) {
  const spaceNameEl = DOMel.querySelector('.space--name');
  model.state.selectedSpace = spaceNameEl.textContent;
}

// Profile Logic
export function profileUpdater() {
  const completedNum = model.state.tasks.filter(
    task => task.completed === true
  ).length;
  console.log(completedNum);

  const profile = help.profileAbbr(model.state.profileName);
  const profileName = model.state.profileName;
  const Spaces = model.state.spaces.length;
  const Queues = model.state.tasks.length;
  const percentageCompleted = (Queues / completedNum) * 100;
  const percentagePending = 100 - percentageCompleted;
  const accountDate = model.state.accountDate;

  console.log({
    profile,
    profileName,
    Spaces,
    Queues,
    percentageCompleted,
    percentagePending,
    accountDate,
  });

  return {
    profile,
    profileName,
    Spaces,
    Queues,
    percentageCompleted,
    percentagePending,
    accountDate,
  };
}
