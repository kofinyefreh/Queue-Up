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
const taskText = document.querySelector('.task-text');
const spaceText = document.querySelector('.space-text');
const spacesList = document.querySelector('.spaces--list');
const taskList = document.querySelector('.task-list');
const openTask = document.querySelector('.open--task');
const addTask = document.querySelector('.add--task');
const closeTask = document.querySelector('.close--task');
const overlayTask = document.querySelector('.overlay-task');
const taskInput = document.querySelector('.task--input');
const formTask = document.querySelector('.form--task');
const spaceTitle = document.querySelector('.space-title');
const [allNum, pendingNum, completedNum, archivedNum] =
  document.querySelectorAll('.tab-num');
const tabs = document.querySelector('.tabs');
const [all, pending, completed, archived] =
  document.querySelectorAll('.tab-name');

// Data Structure
const spaces = [
  { space: 'JavaScript', time: Date.now() },
  { space: 'TypeScript', time: Date.now() },
];

const tasks = [
  {
    id: 0,
    task: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi sapiente quisquam impedit veniam cum, illo, vitae odit dolorem natus, velit at quos error. Qui, modi. Necessitatibus reprehenderit voluptas dicta! Sed.',
    time: Date.now(),
    archived: false,
    completed: true,
    space: 'JavaScript',
  },
  {
    id: 0,
    task: 'Complete the of the JS course by Sep ending ',
    time: Date.now(),
    archived: true,
    completed: true,
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
    task: 'Complete the of the JS course by Sep ending',
    time: Date.now(),
    archived: true,
    completed: false,
    space: 'JavaScript',
  },
  {
    id: 0,
    task: 'Do at least one project with Typescript! 1',
    time: Date.now(),
    archived: false,
    completed: true,
    space: 'TypeScript',
  },
  {
    id: 0,
    task: 'Do at least one project with Typescript! 2',
    time: Date.now(),
    archived: true,
    completed: false,
    space: 'TypeScript',
  },
  {
    id: 0,
    task: 'Do at least one project with Typescript! 3',
    time: Date.now(),
    archived: false,
    completed: false,
    space: 'TypeScript',
  },
  {
    id: 0,
    task: 'Do at least one project with Typescript! 4',
    time: Date.now(),
    archived: false,
    completed: false,
    space: 'TypeScript',
  },
  {
    id: 0,
    task: 'Do at least one project with Typescript! 5',
    time: Date.now(),
    archived: false,
    completed: true,
    space: 'TypeScript',
  },
];

// State Variables
let selected;
let selectedTab;

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
const openForm = function (
  openBtn,
  addbtn,
  form,
  overlay,
  input,
  chars,
  check
) {
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
    check.style.color = 'rgb(23, 23, 23, 0.9);';
    addSpace.disabled = true;
    check.textContent = `Not more than ${chars} chars`;
  }
};

// close forms general function
const closeForm = function (addbtn, openBtn, form, overlay, chars) {
  addbtn.classList.add('hidden');
  openBtn.classList.remove('hidden');
  form.classList.replace(
    `${chars === 25 ? 'block-space-input' : 'block-task-input'}`,
    'hidden'
  );
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
        <p class="last--opened">19/ 9/ 2025</p>
        </div>
        <span class="item--num">${arrList.length}</span>
    `;

    // Rendering actual spaces
    index === spaces.length - 1
      ? (li.classList = `space--item item--${index} selected`)
      : (li.className = `space--item item--${index}`);
    spacesList.appendChild(li);
    updateSpaceCount();
  });
};

// Update Space Count Space
const updateSpaceCount = function () {
  if (selected) {
    const selSpace = selected.querySelector('.item--name').textContent;
    const selNum = selected.querySelector('.item--num');

    const i = tasks.filter(item => item.space === selSpace);
    selNum.textContent = i.length;
  }
};

// build Tasks
const buildTasks = function (arr) {
  taskList.innerHTML = '';
  arr.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
                <div>
                    <span class="left">
                      <div class="circle done"></div>
                      <p class="task-name">
                        ${item.task}
                      </p></span
                    >
                    <p class="date">19/9/2025</p>
                  </div>
                  <div class="right">
                    <div class="circle edit"></div>
                    <div class="circle archive"></div>
                    <div class="circle delete"></div>
                  </div>
    `;
    li.classList.add('task', `${index}`);
    taskList.appendChild(li);
  });
};

// Render tasks
const renderTasks = function () {
  selected = document.querySelector('.selected');

  // Display selected space title
  spaceTitle.textContent = selected.querySelector('.item--name').textContent;

  // Find selected task content
  const selTasksTitle = tasks.filter(function (item) {
    const selectedTitle = selected.querySelector('.item--name').textContent;
    return item.space === selectedTitle;
  });

  let arr;
  // Render Selected task content based on selected tab
  if (selectedTab) {
    let selTabName = selectedTab.querySelector('.tab-name').textContent;

    if (selTabName === 'All')
      arr = selTasksTitle.filter(item => !item.completed && !item.archived);
    if (selTabName === 'Pending')
      arr = selTasksTitle.filter(
        item => !item.completed || (item.archived && !item.completed)
      );
    if (selTabName === 'Completed')
      arr = selTasksTitle.filter(item => item.completed);
    if (selTabName === 'Archived')
      arr = selTasksTitle.filter(item => item.archived);

    buildTasks(arr);
  } else {
    arr = selTasksTitle.filter(item => !item.completed && !item.archived);
    buildTasks(arr);
  }
};

// Update nav
const updateNav = function () {
  const spaceTitle = selected.querySelector('.item--name');
  const sList = tasks.filter(item => item.space === spaceTitle.textContent);

  // all - !archived && !completed
  const allL = sList.filter(item => !item.completed && !item.archived);
  allNum.textContent = `${allL.length}`;

  // pending
  const pendingL = sList.filter(
    item => !item.completed || (item.archived && !item.completed)
  );
  pendingNum.textContent = `${pendingL.length}`;

  // completed
  const completedL = sList.filter(item => item.completed);
  completedNum.textContent = `${completedL.length}`;

  // Archived
  const archivedL = sList.filter(item => item.archived);
  archivedNum.textContent = `${archivedL.length}`;
};

////////////////////////////////////////////////////////////
// LEFT PANE - EVENTS

buildSpaces();
renderTasks();
updateNav();

// Open space form Event
openSpace.addEventListener('click', function () {
  openForm(
    openSpace,
    addSpace,
    formSpace,
    overlaySpace,
    spaceInput,
    25,
    spaceText
  );
});

// Close space form event
overlaySpace.addEventListener('click', function () {
  closeForm(addSpace, openSpace, formSpace, overlaySpace, 25);
});

// check input validity
spaceInput.addEventListener('input', function (e) {
  const valueL = e.target.value.trim().length;

  if (valueL >= 1 && valueL <= 25) {
    spaceText.style.color = 'green';
    addSpace.disabled = false;
    spaceText.textContent = `Not more than ${25} chars`;
  } else {
    spaceText.style.color = 'red';
    addSpace.disabled = true;
    spaceText.textContent = `Should be <= ${25} chars`;
  }

  if (valueL === 0) {
    spaceText.style.color = 'rgb(23, 23, 23, 0.9)';
    addSpace.disabled = true;
    spaceText.textContent = `Not more than ${25} chars`;
  }
});

// Add space Event
addSpace.addEventListener('click', function () {
  if (!addSpace.disabled) {
    const newSpace = capitalize(spaceInput.value);

    // check for existing space names
    const same = spaces.filter(space => space.space === newSpace);
    if (same.length) return;

    // Add new space names to spaces
    spaces.push({ space: newSpace, time: 'date' });
    console.log(spaces);
    buildSpaces();
    renderTasks();
    updateNav();
  }
  // clear inputs and close
  closeForm(addSpace, openSpace, formSpace, overlaySpace, 25);
  spaceInput.value = '';
  spaceText.style.color = 'rgb(23, 23, 23, 0.9)';
});

// Select space event
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
  updateNav();
});

////////////////////////////////////////////////////////////
// RIGHT PANE - EVENTS
openTask.addEventListener('click', function () {
  openForm(openTask, addTask, formTask, overlayTask, taskInput, 100, taskText);
});

overlayTask.addEventListener('click', function () {
  closeForm(addTask, openTask, formTask, overlayTask, 100);
});

// check input validity
taskInput.addEventListener('input', function (e) {
  const valueL = e.target.value.trim().length;

  if (valueL >= 1 && valueL <= 100) {
    taskText.style.color = 'green';
    addTask.disabled = false;
    taskText.textContent = `Not more than 100 chars`;
  } else {
    taskText.style.color = 'red';
    addTask.disabled = true;
    taskText.textContent = `Should be <= 100 chars`;
  }

  if (valueL === 0) {
    taskText.style.color = 'rgb(23, 23, 23, 0.9)';
    addTask.disabled = true;
    taskText.textContent = `Not more than 100 chars`;
  }
});

// Add task event
addTask.addEventListener('click', function () {
  if (!addTask.disabled) {
    // const newSpace = capitalize(spaceInput.value);
    const spaceName = selected.querySelector('.item--name');
    console.log(spaceName.textContent);

    const check = tasks
      .filter(task => task.space === spaceName.textContent)
      .filter(task => task.task === taskInput.value);

    if (check.length) return;

    // Add to spaces
    tasks.unshift({
      id: 0,
      task: taskInput.value,
      time: Date.now(),
      archived: false,
      completed: false,
      space: spaceName.textContent,
    });

    // buildSpaces();
    renderTasks();
    updateNav();

    // clear inputs and close
    closeForm(addTask, openTask, formTask, overlayTask, 100);
    taskInput.value = '';
    taskText.style.color = 'rgb(23, 23, 23, 0.9)';

    updateSpaceCount();
  }
});

// Select tab Event
tabs.addEventListener('click', function (e) {
  // Remove all current selected state
  const tab = document.querySelectorAll('.tab');
  tab.forEach(tab => tab.classList.remove('selected-tab'));

  // Add background to selected
  e.target.closest('.tab').classList.add('selected-tab');
  selectedTab = e.target.closest('.tab');

  // update tasks ui on-click
  const val = selectedTab.querySelector('.tab-name').textContent;

  let arr;
  const a = selected.querySelector('.item--name').textContent;
  const selTasksTitle = tasks.filter(item => item.space === a);

  if (val === 'All')
    arr = selTasksTitle.filter(item => !item.completed && !item.archived);
  if (val === 'Pending')
    arr = selTasksTitle.filter(
      item => !item.completed || (item.archived && !item.completed)
    );
  if (val === 'Completed') arr = selTasksTitle.filter(item => item.completed);
  if (val === 'Archived') arr = selTasksTitle.filter(item => item.archived);

  buildTasks(arr);
});

//////////////////////////////
// Individual Task Events

// 01. Mark task completed
taskList.addEventListener('click', function (e) {
  // get selected array
  const selTitle = selected.querySelector('.item--name').textContent;
  const spaceL = tasks.filter(item => item.space === selTitle);
  console.log(spaceL);

  // get task clicked
  const task = e.target.closest('.left');
  console.log(task);
});

///////////////////////////////////////////////////////////////////////
// Test code
console.log(spaces.at(0).time - spaces.at(1).time);
