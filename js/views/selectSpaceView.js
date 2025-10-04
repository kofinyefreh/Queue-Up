const spacesList = document.querySelector('.spaces--list');

export function updateSelection(selectedEl) {
  // Remove old selection
  document
    .querySelectorAll('.space--item')
    .forEach(item => item.classList.remove('selected'));

  // Highlight new one
  selectedEl.classList.add('selected');
}

export function addSelectSpace(handler) {
  spacesList.addEventListener('click', function (e) {
    const clicked = e.target.closest('.space--item');
    if (!clicked) return;

    handler(clicked); // pass DOM element to controller
  });
}
