'use strict';
////////////////////////////////////////////////////////////
// Global variables

// Selections
const leftPane = document.querySelector('.left--pane');
const openSpace = document.querySelector('.open--space');
const addSpace = document.querySelector('.add--space');
const formSpace = document.querySelector('.form--space');
const overlaySpace = document.querySelector('.overlay');
const spaceInput = document.querySelector('.space--input');
const checkInput = document.querySelector('.check--input');
const spacesList = document.querySelector('.spaces--list');
const taskList = document.querySelector('.task-list');
const openTask = document.querySelector('.open--task');
const closeTask = document.querySelector('.close--task');
const overlayTask = document.querySelector('.overlay-task');
const taskInput = document.querySelector('.task--input');

// Data Structure
const spaces = [
  { space: 'JavaScript', time: Date.now() },
  { space: 'TypeScript', time: Date.now() },
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

// State Variables
let selected;

////////////////////////////////////////////////////////////
// General Functions

// Capitalize Words
const capitalize = function (input) {
  const cleanInput = input.trim();
  if (cleanInput.includes(' ')) {
    const mulWords = cleanInput.split(' ').map(word => {
      return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    });
    return mulWords.join(' ');
  } else return `${cleanInput.slice(0, 1).toUpperCase()}${cleanInput.slice(1)}`;
};

// Open forms general function
const openForm = function (openBtn, addbtn, form, overlay, input, chars) {
  addbtn.classList.remove('hidden');
  openBtn.classList.add('hidden');
  form.classList.replace(
    'hidden',
    `${chars === 25 ? 'block-space-input' : 'block-task-input'}`
  );
  overlay.classList.remove('hidden');
  input.focus();
  if (input.value.trim().length >= 1 && input.value.trim().length <= chars)
    addbtn.disabled = false;
  else addbtn.disabled = true;

  // Set check input to default
  if (input.value.trim().length === 0) {
    checkInput.style.color = 'rgb(23, 23, 23, 0.9);';
    addSpace.disabled = true;
    checkInput.textContent = `Not more than ${chars} chars`;
  }
};

// close forms general function
const closeForm = function (addbtn, openBtn, form, overlay) {
  addbtn.classList.add('hidden');
  openBtn.classList.remove('hidden');
  form.classList.replace('block-space-input', 'hidden');
  overlay.classList.add('hidden');
};

// build spaces
const buildSpaces = function () {
  spacesList.innerHTML = '';

  spaces.forEach(function (space, index) {
    // Count task items
    const arrList = tasks.filter(item => item.space === space.space);

    // Creating actual spaces
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <p class="item--name">${space.space}</p>
        <p class="last--opened">${'date'}</p>
        </div>
        <span class="item--nums">${arrList.length}</span>
    `;

    // Rendering actual spaces
    index === spaces.length - 1
      ? (li.classList = `space--item item--${index} selected`)
      : (li.className = `space--item item--${index}`);
    spacesList.appendChild(li);
  });
};

// Render tasks
const renderTasks = function () {
  selected = document.querySelector('.selected');

  // Find selected task content
  const selTasksTitle = tasks.filter(function (item) {
    const selectedTitle = selected.querySelector('.item--name').textContent;
    return item.space === selectedTitle;
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

// Check Valid input
const checkValidInput = function (e, chars, text, btn) {
  const valueL = e.target.value.trim().length;

  if (valueL >= 1 && valueL <= chars) {
    text.style.color = 'green';
    btn.disabled = false;
    checkInput.textContent = `Not more than ${chars} chars`;
  } else {
    text.style.color = 'red';
    btn.disabled = true;
    text.textContent = `Should be <= ${chars} chars`;
  }

  if (valueL === 0) {
    text.style.color = 'rgb(23, 23, 23, 0.9)';
    btn.disabled = true;
    text.textContent = `Not more than ${chars} chars`;
  }
};

////////////////////////////////////////////////////////////
buildSpaces();
renderTasks();

// Open space form Event
openSpace.addEventListener('click', function () {
  openForm(openSpace, addSpace, formSpace, overlaySpace, spaceInput, 25);
});

// Close space form event
overlaySpace.addEventListener('click', function () {
  closeForm(addSpace, openSpace, formSpace, overlaySpace);
});

// check input validity
spaceInput.addEventListener('input', function (e) {
  checkValidInput(e, 25, checkInput, addSpace);
});

// Add space Event
addSpace.addEventListener('click', function () {
  if (!addSpace.disabled) {
    const newSpace = capitalize(spaceInput.value);

    // Add to spaces
    spaces.push({ space: newSpace, time: 'date' });
    console.log(spaces);
    buildSpaces();
    renderTasks();

    // clear inputs and close
    closeForm(addSpace, openSpace, formSpace, overlaySpace);
    spaceInput.value = '';
    checkInput.style.color = 'rgb(23, 23, 23, 0.9)';
  }
});

// Select item event
spacesList.addEventListener('click', function (e) {
  if (!e.target.closest('.space--item').classList.contains('space--item'))
    return;

  // Remove selected classes
  const titles = document.querySelectorAll('.space--item');
  titles.forEach(title => title.classList.remove('selected'));

  // Set new selected item
  selected = e.target.closest('.space--item');
  selected.classList.add('selected');

  // Render Tasks from selected
  renderTasks();
});

// Test code

console.log(spaces.at(0).time - spaces.at(1).time);
