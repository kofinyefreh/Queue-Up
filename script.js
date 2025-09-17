'use strict';
////////////////////////////////////////////////////////////
// Global variables
// State Variables
let taksNum = 0;

// Selections
const leftPane = document.querySelector('.left--pane');
const openSpace = document.querySelector('.open--space');
const addSpace = document.querySelector('.add--space');
const formSpace = document.querySelector('.form--space');
const overlay1 = document.querySelector('.overlay');
const spaceInput = document.querySelector('.space--input');
const checkInput = document.querySelector('.check--input');
const spacesList = document.querySelector('.spaces--list');
const taskList = document.querySelector('.task-list');

// Data Structure
const spaces = [
  { space: 'JavaScript', time: Date.now(), tasksNumber: taksNum },
  { space: 'TypeScript', time: Date.now(), tasksNumber: taksNum },
  // { space: 'Micro Services', time: Date.now(), tasksNumber: taksNum },
  // { space: 'Prisma', time: Date.now(), tasksNumber: taksNum },
  // { space: 'Redux Toolkit', time: Date.now(), tasksNumber: taksNum },
  // { space: 'Kubernetes', time: Date.now(), tasksNumber: taksNum },
  // { space: 'Next js', time: Date.now(), tasksNumber: taksNum },
  // { space: 'Microsoft Azure', time: Date.now(), tasksNumber: taksNum },
  // { space: 'Docker', time: Date.now(), tasksNumber: taksNum },
  // { space: 'Zustand', time: Date.now(), tasksNumber: taksNum },
  // { space: 'Express JS', time: Date.now(), tasksNumber: taksNum },
];

const tasks = [
  {
    id: 0,
    task: 'Complete the of the JS course by Sep ending',
    time: Date.now(),
    archived: false,
    completed: false,
    space: 'JavaScript',
  },
  {
    id: 0,
    task: 'Complete the of the JS course by Sep ending',
    time: Date.now(),
    archived: false,
    completed: false,
    space: 'JavaScript',
  },
  {
    id: 0,
    task: 'Do at least one project with Typescript!',
    time: Date.now(),
    archived: false,
    completed: false,
    space: 'TypeScript',
  },
  {
    id: 0,
    task: 'Complete the of the JS course by Sep ending',
    time: Date.now(),
    archived: false,
    completed: false,
    space: 'JavaScript',
  },
  {
    id: 0,
    task: 'Do at least one project with Typescript!',
    time: Date.now(),
    archived: false,
    completed: false,
    space: 'TypeScript',
  },
  {
    id: 0,
    task: 'Do at least one project with Typescript!',
    time: Date.now(),
    archived: false,
    completed: false,
    space: 'TypeScript',
  },
  {
    id: 0,
    task: 'Complete the of the JS course by Sep ending',
    time: Date.now(),
    archived: false,
    completed: false,
    space: 'JavaScript',
  },
];

let selected;

////////////////////////////////////////////////////////////
// General Functions

// Capitalize Words
const capitalize = function (word) {
  if (word.includes(' ')) {
    let newWord = [];
    word.split(' ').map(word => {
      const [first, ...others] = word.toLowerCase().split('');
      const changed = [first.toUpperCase(), ...others].join('');
      newWord.push(changed);
    });
    return newWord.join(' ');
  } else {
    const [first, ...others] = word.toLowerCase().split('');
    const changed = [first.toUpperCase(), ...others].join('');
    return changed;
  }
};

// Render spaces
const renderSpaces = function () {
  spacesList.innerHTML = '';

  // Creating spaces
  spaces.forEach(function (space, index) {
    // Creating dates
    const fulldate = new Date(space.time);
    const day = fulldate.getDate();
    const month = fulldate.getMonth();
    const year = fulldate.getFullYear();
    const actualDate = `${day}/${month}/${year}`;

    // Creating actual spaces
    const li = document.createElement('li');
    li.innerHTML = `
              <div>
                    <p class="item--name">${space.space}</p>
                    <p class="last--opened">${actualDate}</p>
                  </div>
                  <span class="item--nums">${taksNum}</span>
    `;
    li.className = `${
      index === 0
        ? `space--item item--${index} selected`
        : `space--item item--${index}`
    }`;
    spacesList.appendChild(li);
    selected = document.querySelector('.item--0');
  });
};
renderSpaces();

const renderTasks = function () {
  // Find seleted task content
  const selTasksTitle = tasks.filter(function (item, index) {
    const seletedTitle = selected.querySelector('.item--name').textContent;
    return item.space === seletedTitle;
  });
  console.log(selTasksTitle);

  // Render Selected task content on UI
  taskList.innerHTML = '';
  selTasksTitle.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
                  <div class="left">
                    <div class="circle done"></div>
                    <p class="task-name">${item.task}</p>
                  </div>
                  <div class="right">
                    <p class="date">07-08-2025</p>
                    <div class="circle edit"></div>
                    <div class="circle archive"></div>
                    <div class="circle delete"></div>
                  </div>
    `;
    li.classList.add('task', `task--${index}`);
    taskList.appendChild(li);
  });
};

////////////////////////////////////////////////////////////
// Spaces logic

// Open space form
openSpace.addEventListener('click', function () {
  addSpace.classList.remove('hidden');
  openSpace.classList.add('hidden');
  formSpace.classList.replace('hidden', 'block-space-input');
  overlay1.classList.remove('hidden');
  spaceInput.focus();
  if (
    spaceInput.value.trim().length >= 1 &&
    spaceInput.value.trim().length <= 25
  )
    addSpace.disabled = false;
  else addSpace.disabled = true;

  // Set check input to default
  if (spaceInput.value.trim().length === 0) {
    checkInput.style.color = 'rgb(23, 23, 23, 0.9);';
    addSpace.disabled = true;
    checkInput.textContent = 'Not more than 25 chars';
  }
});

// close space form
overlay1.addEventListener('click', function () {
  addSpace.classList.add('hidden');
  openSpace.classList.remove('hidden');
  formSpace.classList.replace('block-space-input', 'hidden');
  overlay1.classList.add('hidden');
});

// check input validity
spaceInput.addEventListener('input', function (e) {
  const valueL = e.target.value.trim().length;

  if (valueL >= 1 && valueL <= 25) {
    checkInput.style.color = 'green';
    addSpace.disabled = false;
    checkInput.textContent = 'Not more than 25 chars';
  } else {
    checkInput.style.color = 'red';
    addSpace.disabled = true;
    checkInput.textContent = 'Should be <= 25 chars';
  }

  if (valueL === 0) {
    checkInput.style.color = 'rgb(23, 23, 23, 0.9)';
    addSpace.disabled = true;
    checkInput.textContent = 'Not more than 25 chars';
  }
});

// Add space logic
addSpace.addEventListener('click', function () {
  if (!addSpace.disabled) {
    const newSpace = capitalize(spaceInput.value);

    // Add to spaces
    spaces.push({ space: newSpace, time: Date.now(), tasksNumber: taksNum });
    console.log(spaces);
    renderSpaces();

    // clear inputs and close
    addSpace.classList.add('hidden');
    openSpace.classList.remove('hidden');
    formSpace.classList.replace('block-space-input', 'hidden');
    overlay1.classList.add('hidden');
    spaceInput.value = '';
    checkInput.style.color = 'rgb(23, 23, 23, 0.9)';
  }
});

// Seleted item function
spacesList.addEventListener('click', function (e) {
  if (!e.target.closest('.space--item').classList.contains('space--item'))
    return;

  // Remove selected classes
  const titles = document.querySelectorAll('.space--item');
  titles.forEach(title => title.classList.remove('selected'));

  // Set new selected item
  selected = e.target.closest('.space--item');
  selected.classList.add('selected');
  console.log(selected);

  // Render Tasks from selected
  renderTasks();
});

// Test code

console.log(spaces.at(0).time - spaces.at(1).time);

const selectedTasks = tasks.filter(function (item, index) {
  const seletedTitle = selected.querySelector('.item--name').textContent;
  return item.space === seletedTitle;
});

console.log(selectedTasks);
// console.log(selected);
