import * as help from '../helpers.js';

// DOM selections
const [openFormBtn, addFormBtn] = document.querySelectorAll('.btn--1');
const [spaceOverlay, taskOverlay] = document.querySelectorAll('.overlay');
const form = document.querySelector('.form');
const input = document.querySelector('.space--input');
const validText = document.querySelector('.space-text');
const spacesList = document.querySelector('.spaces--list');

// UI state
export function openForm() {
  addFormBtn.classList.remove('hidden');
  openFormBtn.classList.add('hidden');
  form.classList.replace('hidden', 'block-space-input');
  spaceOverlay.classList.remove('hidden');
  input.focus();
}

export function closeForm() {
  addFormBtn.classList.add('hidden');
  openFormBtn.classList.remove('hidden');
  form.classList.replace('block-space-input', 'hidden');
  spaceOverlay.classList.add('hidden');
}

export function showValidation(valid, msg) {
  validText.textContent = msg;
  if (valid) {
    validText.style.color = 'green';
    addFormBtn.disabled = false;
  } else if (valid === null) {
    validText.style.color = 'rgb(23, 23, 23, 0.9)';
    addFormBtn.disabled = true;
  } else {
    validText.style.color = 'red';
    addFormBtn.disabled = true;
  }
}

export function clearInput() {
  input.value = '';
  showValidation(null, 'Not more than 25 chars');
}

export function getInputValue() {
  return input.value.trim();
}

export function renderAddedSpaces(spaces, tasks) {
  spacesList.innerHTML = '';

  if (!spaces) return;
  spaces.forEach((space, index) => {
    // Count tasks for this space
    const taskCount = tasks.filter(t => t.space === space.space).length;

    const li = document.createElement('li');
    li.className = `space--item item--${index}`;
    if (index === spaces.length - 1) li.classList.add('selected');

    li.innerHTML = `
      <div>
        <p class="space--name">${help.capitalize(space.space)}</p>
        <p class="last--opened">${help.formatDate(space.time)}</p>
      </div>
      <span class="space--num">${taskCount}</span>
    `;

    spacesList.appendChild(li);
    li.scrollIntoView(/*{ behavior: 'smooth' }*/);
    li.setAttribute('data-space', space.space);
    // console.log(li.dataset.space);
  });
}

// Event bindings (Controller attaches handlers here)
export function onOpenForm(handler) {
  openFormBtn.addEventListener('click', handler);
}

export function onCloseForm(handler) {
  spaceOverlay.addEventListener('click', handler);
}

export function onInput(handler) {
  input.addEventListener('input', e => handler(e.target.value));
}

export function onAddSpace(handler) {
  addFormBtn.addEventListener('click', e => handler(e));
}
