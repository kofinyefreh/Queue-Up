import * as help from '../helpers.js';

const spacesList = document.querySelector('.spaces--list');

// Render all spaces - Already has a selected item
export function renderSpaces(spaces, tasks) {
  const selectedSpace = document.querySelector('.selected');

  spacesList.innerHTML = '';
  spaces.forEach((space, index) => {
    // Count tasks for this space
    const taskCount = tasks.filter(
      t => t.space.toLowerCase() === space.name.toLowerCase()
    ).length;

    const li = document.createElement('li');
    li.className = `space--item item--${index}`;
    li.setAttribute('data-space', space.space);

    if (selectedSpace.classList.contains(`item--${index}`))
      li.classList.add('selected');

    li.innerHTML = `
      <div>
        <p class="space--name">${help.capitalize(space.name)}</p>
        <p class="last--opened">Active: ${help.calcDays(space.time)}</p>
      </div>
      <span class="space--num">${taskCount}</span>
    `;
    spacesList.appendChild(li);

    // li.scrollIntoView({ behavior: 'smooth' });
  });
}
