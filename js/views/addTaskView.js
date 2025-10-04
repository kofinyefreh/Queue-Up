// DOM selections
const [openFormBtn, addFormBtn] = document.querySelectorAll('.btn--2');
const [spaceOverlay, taskOverlay] = document.querySelectorAll('.overlay');
const form = document.querySelector('.form--task');
const input = document.querySelector('.task--input');
const validText = document.querySelector('.task-text');

// UI state
export function openForm() {
  addFormBtn.classList.remove('hidden');
  openFormBtn.classList.add('hidden');
  form.classList.replace('hidden', 'block-space-input');
  taskOverlay.classList.remove('hidden');
  input.focus();
}

export function closeForm() {
  addFormBtn.classList.add('hidden');
  openFormBtn.classList.remove('hidden');
  form.classList.replace('block-space-input', 'hidden');
  taskOverlay.classList.add('hidden');
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
  showValidation(null, 'Not more than 200 chars');
}

export function getInputValue() {
  return input.value.trim();
}

// Event bindings (Controller attaches handlers here)
export function onOpenForm(handler) {
  openFormBtn.addEventListener('click', handler);
}

export function onCloseForm(handler) {
  taskOverlay.addEventListener('click', handler);
}

export function onInput(handler) {
  input.addEventListener('input', e => handler(e.target.value));
}

export function onAddTask(handler) {
  addFormBtn.addEventListener('click', e => handler(e));
}
