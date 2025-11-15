const rightPane = document.querySelector('.right--pane');
const leftPane = document.querySelector('.left--pane');

// mobile
if (window.innerWidth < 900) {
  rightPane.classList.add('hidden');
}
