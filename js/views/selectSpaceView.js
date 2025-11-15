const spacesList = document.querySelector('.spaces--list');
const rightPane = document.querySelector('.right--pane');
const leftPane = document.querySelector('.left--pane');
const backwards = document.querySelector('.backwards');

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

    // mobile responsive
    if (window.innerWidth < 900) {
      setTimeout(() => {
        rightPane.classList.remove('hidden');
        leftPane.classList.add('hidden');
      }, 300);
    }

    handler(clicked);
  });
}
